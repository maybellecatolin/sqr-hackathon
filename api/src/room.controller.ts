import { Controller, Post, Body } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PokerGateway } from './poker.gateway';

@Controller('room')
export class RoomController {
  constructor(private readonly pokerGateway: PokerGateway) {}

  @Post()
  createRoom(@Body() body: { facilitator: string }) {
    const roomId = randomUUID();
    this.pokerGateway.createRoom(roomId, body.facilitator);
    return { roomId };
  }
}
