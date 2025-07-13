import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PokerGateway } from './poker.gateway';
import { RetroGateway } from './retro.gateway';

@Controller('room')
export class RoomController {
  constructor(
    private readonly pokerGateway: PokerGateway,
    private readonly retroGateway: RetroGateway,
  ) {}

  @Post()
  createRoom(@Body() body: { facilitator: string; type: 'poker' | 'retro' }) {
    const roomId = randomUUID();
    const strategies: Record<
      'poker' | 'retro',
      (roomId: string, facilitator: string) => void
    > = {
      poker: this.pokerGateway.createRoom.bind(this.pokerGateway) as (
        roomId: string,
        facilitator: string,
      ) => void,
      retro: this.retroGateway.createRoom.bind(this.retroGateway) as (
        roomId: string,
        facilitator: string,
      ) => void,
    };
    const create = strategies[body.type];
    if (!create) {
      throw new BadRequestException('Invalid room type');
    }
    create(roomId, body.facilitator);
    return { roomId };
  }
}
