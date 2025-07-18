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
  role?: 'facilitator' | 'observer' | 'voter';
  canVote?: boolean;
}

const logger = new Logger('UserGateway');

@WebSocketGateway({ cors: true })
export class UserGateway {
  @WebSocketServer()
  server: Server;

  private users: Record<string, User> = {};

  @SubscribeMessage('createUser')
  handleCreateUser(
    @MessageBody()
    data: { name: string },
    @ConnectedSocket() client: Socket,
  ) {
    const id = randomUUID();
    const user: User = {
      id,
      name: data.name,
    };
    this.users[id] = user;
    logger.log(`User created: ${user.name} [${id}]`);
    logger.log(`Current users: ${JSON.stringify(this.users)}`);
    client.emit('userCreated', user);
  }

  @SubscribeMessage('setRole')
  handleSetRole(
    @MessageBody()
    data: { id: string; role: 'facilitator' | 'observer' | 'voter' },
    @ConnectedSocket() client: Socket,
  ) {
    logger.log(`setRole called with id: ${data.id}, role: ${data.role}`);
    logger.log(`Current users before setRole: ${JSON.stringify(this.users)}`);
    const user = this.users[data.id];
    if (!user) {
      logger.warn(`User not found: ${data.id}`);
      return;
    }
    user.role = data.role;
    user.canVote = data.role === 'voter';
    logger.log(`User role updated: ${user.name} (${user.role}) [${user.id}]`);
    logger.log(`Current users after setRole: ${JSON.stringify(this.users)}`);
    client.emit('roleSet', user);
  }
}
