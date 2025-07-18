import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PokerGateway } from './poker.gateway';
import { RetroGateway } from './retro.gateway';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly pokerGateway: PokerGateway,
    private readonly retroGateway: RetroGateway,
  ) {}

  @Post()
  async createRoom(
    @Body() body: { facilitator: string; type: 'poker' | 'retro' },
  ) {
    try {
      const roomId = randomUUID();
      const strategies: Record<
        'poker' | 'retro',
        (roomId: string, facilitator: string) => Promise<void>
      > = {
        poker: this.pokerGateway.createRoom.bind(this.pokerGateway) as (
          roomId: string,
          facilitator: string,
        ) => Promise<void>,
        retro: this.retroGateway.createRoom.bind(this.retroGateway) as (
          roomId: string,
          facilitator: string,
        ) => Promise<void>,
      };
      const create = strategies[body.type];
      if (!create) {
        throw new BadRequestException('Invalid room type');
      }
      await create(roomId, body.facilitator);
      return { roomId };
    } catch (error) {
      console.error('Error creating room:', error);
      throw new BadRequestException('Failed to create room');
    }
  }
}
