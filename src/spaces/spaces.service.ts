import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space } from './space.entity';
import { CreateSpaceDto } from './dto/create-space.dto';
import { Seat } from '../seats/seat.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Space) private spaces: Repository<Space>,
    @InjectRepository(Seat) private seats: Repository<Seat>,
  ) {}

  create(dto: CreateSpaceDto) {
    const space = this.spaces.create(dto);
    return this.spaces.save(space);
  }
  findAll() { return this.spaces.find({ relations: ['seats'] }); }

  async findOne(id: number) {
    const s = await this.spaces.findOne({ where: { id }, relations: ['seats'] });
    if (!s) throw new NotFoundException('Space not found');
    return s;
  }

  async seedSeats(spaceId: number) {
    const space = await this.findOne(spaceId);
    if (space.seats?.length) return space;
    const seats: Seat[] = [];
    for (let i = 1; i <= space.totalSeats; i++) {
      seats.push(this.seats.create({ label: `S${i}`, space }));
    }
    await this.seats.save(seats);
    return this.findOne(spaceId);
  }
}
