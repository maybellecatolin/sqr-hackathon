import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { randomUUID } from 'crypto';
import { Server, Socket } from 'socket.io';

interface User {
  id: string;
  name: string;
  role: 'facilitator' | 'observer' | 'voter';
  canVote: boolean;
}

interface Vote {
  user: User;
  value: string;
}
interface RoomState {
  votes: Vote[];
  revealed: boolean;
  users: User[];
  story?: string;
}

const logger = new Logger('PokerGateway');

@WebSocketGateway({ cors: true })
export class PokerGateway {
  @WebSocketServer()
  server: Server;

  private rooms: Record<string, RoomState> = {};

  async createRoom(roomId: string, facilitator: string) {
    logger.log(`Creating room ${roomId} with facilitator ${facilitator}`);
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = {
        votes: [],
        revealed: false,
        users: [
          {
            id: randomUUID(),
            name: facilitator,
            role: 'facilitator',
            canVote: false,
          },
        ],
        story: '',
      };
    }
    // Always emit state with correct canVote for all users
    const state = {
      roomId,
      ...this.rooms[roomId],
      users: this.rooms[roomId].users.map((u) => ({
        ...u,
        canVote: u.role === 'voter',
      })),
    };
    const socket = this.server.of('/').sockets.get(roomId);
    if (socket) {
      await socket.join(roomId);
    }
    this.server.to(roomId).emit('state', state);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    @MessageBody()
    data: {
      user: User;
    },
    @ConnectedSocket() client: Socket,
  ) {
    // Generate a unique roomId
    const roomId = randomUUID();
    logger.log(
      `[PokerGateway] Creating room ${roomId} for user ${JSON.stringify(data.user)}`,
    );
    logger.log(`Creating room ${roomId} with facilitator ${data.user.name}`);
    this.rooms[roomId] = {
      votes: [],
      revealed: false,
      users: [
        {
          ...data.user,
        },
      ],
      story: '',
    };
    await client.join(roomId);
    // Always emit state with correct canVote for all users
    const state = {
      ...this.rooms[roomId],
      roomId,
      users: this.rooms[roomId].users.map((u) => ({
        ...u,
        canVote: u.role === 'voter',
      })),
    };
    this.server.to(roomId).emit('state', state);
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody()
    data: {
      room: string;
      user: User;
    },
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(data.room);
    if (!this.rooms[data.room]) {
      this.rooms[data.room] = {
        votes: [],
        revealed: false,
        users: [],
      };
    }
    // Add user if not already present
    const room = this.rooms[data.room];
    if (!room.users.find((u) => u.name === data.user.name)) {
      room.users.push({
        ...data.user,
        canVote: data.user.role === 'voter',
      });
    }
    // Always emit state with correct canVote for all users
    const state = {
      ...room,
      roomId: data.room,
      users: room.users.map((u) => ({
        ...u,
        canVote: u.role === 'voter',
      })),
    };
    // Broadcast state to all clients in the room
    this.server.to(data.room).emit('state', state);
  }

  @SubscribeMessage('vote')
  handleVote(@MessageBody() data: { room: string; user: User; value: string }) {
    const room = this.rooms[data.room];
    if (!room) return;
    const userObj = room.users.find((u) => u.id === data.user.id);
    if (!userObj || userObj.role !== 'voter') return;
    const existing = room.votes.find((v) => v.user.id === data.user.id);
    if (existing) {
      existing.value = data.value;
    } else {
      room.votes.push({ user: data.user, value: data.value });
    }
    // Always emit state with correct canVote for all users
    const state = {
      ...room,
      roomId: data.room,
      users: room.users.map((u) => ({
        ...u,
        canVote: u.role === 'voter',
      })),
    };
    this.server.to(data.room).emit('state', state);
  }

  @SubscribeMessage('reveal')
  handleReveal(@MessageBody() data: { room: string }) {
    const room = this.rooms[data.room];
    if (!room) return;
    room.revealed = !room.revealed;
    // Always emit state with correct canVote for all users
    const state = {
      ...room,
      roomId: data.room,
      users: room.users.map((u) => ({
        ...u,
        canVote: u.role === 'voter',
      })),
    };
    this.server.to(data.room).emit('state', state);
  }

  @SubscribeMessage('setStory')
  handleSetStory(@MessageBody() data: { room: string; story: string }) {
    const room = this.rooms[data.room];
    if (!room) return;
    room.story = data.story;
    // Always emit state with correct canVote for all users
    const state = {
      ...room,
      roomId: data.room,
      users: room.users.map((u) => ({
        ...u,
        canVote: u.role === 'voter',
      })),
    };
    this.server.to(data.room).emit('state', state);
  }

  @SubscribeMessage('reset')
  handleReset(@MessageBody() data: { room: string }) {
    const room = this.rooms[data.room];
    if (!room) return;
    room.votes = [];
    room.revealed = false;
    // Always emit state with correct canVote for all users
    const state = {
      ...room,
      roomId: data.room,
      users: room.users.map((u) => ({
        ...u,
        canVote: u.role === 'voter',
      })),
    };
    this.server.to(data.room).emit('state', state);
  }
}
