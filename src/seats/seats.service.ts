import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './seat.entity';
import { Space } from '../spaces/space.entity';
import { CreateSeatDto } from './dto/create-seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat) private seats: Repository<Seat>,
    @InjectRepository(Space) private spaces: Repository<Space>,
  ) {}

  async create(spaceId: number, dto: CreateSeatDto) {
    const space = await this.spaces.findOne({ where: { id: spaceId } });
    if (!space) throw new NotFoundException('Space not found');
    const seat = this.seats.create({ ...dto, space });
    return this.seats.save(seat);
  }

  async list(spaceId: number, status?: string) {
    const qb = this.seats.createQueryBuilder('seat')
      .leftJoin('seat.space', 'space')
      .addSelect(['space.id'])
      .where('space.id = :spaceId', { spaceId });
    if (status) qb.andWhere('seat.status = :status', { status });
    return qb.orderBy('seat.id', 'ASC').getMany();
  }

  async updateStatus(seatId: number, status: Seat['status']) {
    const seat = await this.seats.findOne({ where: { id: seatId }, relations: ['space'] });
    if (!seat) throw new NotFoundException('Seat not found');
    seat.status = status;
    return this.seats.save(seat);
  }

  lock(id: number)   { return this.updateStatus(id, 'HELD'); }
  unlock(id: number) { return this.updateStatus(id, 'AVAILABLE'); }
}
