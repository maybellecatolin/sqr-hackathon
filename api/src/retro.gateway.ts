import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { randomUUID } from 'crypto';
import { Server, Socket } from 'socket.io';

interface RetroItem {
  id: string;
  type: 'wentWell' | 'wentWrong' | 'toImprove' | 'actionItems';
  text: string;
  author: string;
  votes: number;
}

interface RetroUser {
  name: string;
  role: 'facilitator' | 'observer' | 'voter';
  canVote: boolean;
}

interface RetroRoomState {
  items: RetroItem[];
  users: RetroUser[];
}

@WebSocketGateway({ cors: true })
export class RetroGateway {
  @WebSocketServer()
  server: Server;

  private rooms: Record<string, RetroRoomState> = {};

  createRoom(roomId: string, facilitator: string) {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = {
        items: [],
        users: [{ name: facilitator, role: 'facilitator', canVote: false }],
      };
    }
  }

  @SubscribeMessage('retroCreateRoom')
  async handleCreateRoom(
    @MessageBody()
    data: { roomId: string; facilitator: string },
    @ConnectedSocket() client: Socket,
  ) {
    const roomId = randomUUID();
    this.createRoom(roomId, data.facilitator);
    await client.join(roomId);
    this.server.to(roomId).emit('retroState', this.rooms[roomId]);
  }

  @SubscribeMessage('retroJoin')
  async handleJoin(
    @MessageBody()
    data: {
      room: string;
      user: string;
      role: 'facilitator' | 'observer' | 'voter';
    },
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(data.room);
    if (!this.rooms[data.room]) {
      this.rooms[data.room] = {
        items: [],
        users: [],
      };
    }
    const room = this.rooms[data.room];
    if (!room.users.find((u) => u.name === data.user)) {
      room.users.push({
        name: data.user,
        role: data.role,
        canVote: data.role === 'voter',
      });
    }
    // Always emit state with correct canVote for all users
    const state = {
      ...room,
      users: room.users.map((u) => ({
        ...u,
        canVote: u.role === 'voter',
      })),
    };
    this.server.to(data.room).emit('retroState', state);
  }

  @SubscribeMessage('retroAddItem')
  handleAddItem(
    @MessageBody()
    data: {
      room: string;
      user: string;
      item: Omit<RetroItem, 'id' | 'votes'>;
    },
  ) {
    const room = this.rooms[data.room];
    if (!room) return;
    const user = room.users.find((u) => u.name === data.user);
    if (!user || user.role !== 'voter') return;
    const newItem: RetroItem = {
      ...data.item,
      id: Math.random().toString(36).substr(2, 9),
      votes: 0,
    };
    room.items.push(newItem);
    // Always emit state with correct canVote for all users
    const state = {
      ...room,
      users: room.users.map((u) => ({
        ...u,
        canVote: u.role === 'voter',
      })),
    };
    this.server.to(data.room).emit('retroState', state);
  }

  @SubscribeMessage('retroVoteItem')
  handleVoteItem(
    @MessageBody()
    data: {
      room: string;
      user: string;
      itemId: string;
    },
  ) {
    const room = this.rooms[data.room];
    if (!room) return;
    const user = room.users.find((u) => u.name === data.user);
    if (!user || user.role !== 'voter') return;
    const item = room.items.find((i) => i.id === data.itemId);
    if (item) {
      item.votes += 1;
    }
    // Always emit state with correct isVoteEnable for all users
    const state = {
      ...room,
      users: room.users.map((u) => ({
        ...u,
        isVoteEnable: u.role === 'voter',
      })),
    };
    this.server.to(data.room).emit('retroState', state);
  }

  @SubscribeMessage('retroDeleteItem')
  handleDeleteItem(@MessageBody() data: { room: string; itemId: string }) {
    const room = this.rooms[data.room];
    if (!room) return;
    room.items = room.items.filter((i) => i.id !== data.itemId);
    // Always emit state with correct isVoteEnable for all users
    const state = {
      ...room,
      users: room.users.map((u) => ({
        ...u,
        isVoteEnable: u.role === 'voter',
      })),
    };
    this.server.to(data.room).emit('retroState', state);
  }

  @SubscribeMessage('retroReset')
  handleReset(@MessageBody() data: { room: string }) {
    const room = this.rooms[data.room];
    if (!room) return;
    room.items = [];
    this.server.to(data.room).emit('retroState', room);
  }
}
