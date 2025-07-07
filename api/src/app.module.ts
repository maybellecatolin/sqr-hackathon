import { Module } from '@nestjs/common';
import { PokerGateway } from './poker.gateway';
import { RoomController } from './room.controller';

@Module({
  providers: [PokerGateway],
  controllers: [RoomController],
})
export class AppModule {}
