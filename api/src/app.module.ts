import { Module } from '@nestjs/common';
import { PokerGateway } from './poker.gateway';
import { RetroGateway } from './retro.gateway';
import { RoomController } from './room.controller';
import { UserGateway } from './user.gateway';

@Module({
  providers: [PokerGateway, RetroGateway, UserGateway],
  controllers: [RoomController],
})
export class AppModule {}
