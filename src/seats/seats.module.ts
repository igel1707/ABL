import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './seat.entity';
import { Space } from '../spaces/space.entity';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Space])],
  providers: [SeatsService],
  controllers: [SeatsController],
})
export class SeatsModule {}
