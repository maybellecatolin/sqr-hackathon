import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface User {
  name: string;
  role: 'facilitator' | 'observer' | 'voter';
}

interface Vote {
  user: string;
  value: string;
}

interface RoomState {
  votes: Vote[];
  revealed: boolean;
  users: User[];
  story?: string;
}

@WebSocketGateway({ cors: true })
export class PokerGateway {
  @WebSocketServer()
  server: Server;

  private rooms: Record<string, RoomState> = {};

  createRoom(roomId: string, facilitator: string) {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = {
        votes: [],
        revealed: false,
        users: [{ name: facilitator, role: 'facilitator' }],
        story: '',
      };
    }
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody()
    data: {
      room: string;
      user: string;
      role: 'observer' | 'voter' | 'facilitator';
    },
    @ConnectedSocket() client: Socket,
  ) {
    void client.join(data.room);
    if (!this.rooms[data.room]) {
      this.rooms[data.room] = {
        votes: [],
        revealed: false,
        users: [],
      };
    }
    // Add user if not already present
    const room = this.rooms[data.room];
    if (!room.users.find((u) => u.name === data.user)) {
      room.users.push({ name: data.user, role: data.role });
    }
    this.server.to(data.room).emit('state', room);
  }

  @SubscribeMessage('vote')
  handleVote(
    @MessageBody() data: { room: string; user: string; value: string },
  ) {
    const room = this.rooms[data.room];
    if (!room) return;
    const existing = room.votes.find((v) => v.user === data.user);
    if (existing) {
      existing.value = data.value;
    } else {
      room.votes.push({ user: data.user, value: data.value });
    }
    this.server.to(data.room).emit('state', room);
  }

  @SubscribeMessage('reveal')
  handleReveal(@MessageBody() data: { room: string }) {
    const room = this.rooms[data.room];
    if (!room) return;
    room.revealed = true;
    this.server.to(data.room).emit('state', room);
  }

  @SubscribeMessage('setStory')
  handleSetStory(@MessageBody() data: { room: string; story: string }) {
    const room = this.rooms[data.room];
    if (!room) return;
    room.story = data.story;
    this.server.to(data.room).emit('state', room);
  }

  @SubscribeMessage('reset')
  handleReset(@MessageBody() data: { room: string }) {
    const room = this.rooms[data.room];
    if (!room) return;
    room.votes = [];
    room.revealed = false;
    this.server.to(data.room).emit('state', room);
  }
}
