import { Module } from '@nestjs/common';
import { PokerGateway } from './poker.gateway';
import { RetroGateway } from './retro.gateway';
import { RoomController } from './room.controller';

@Module({
  providers: [PokerGateway, RetroGateway],
  controllers: [RoomController],
})
export class AppModule {}
