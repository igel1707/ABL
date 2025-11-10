import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Space } from '../spaces/space.entity';
import { ApiProperty } from '@nestjs/swagger';
export type SeatStatus = 'AVAILABLE' | 'HELD' | 'RESERVED' | 'DISABLED';

@Entity()
export class Seat {
  @ApiProperty() @PrimaryGeneratedColumn() id: number;
  @ApiProperty({ example: 'S1' }) @Column() label: string;
  @ApiProperty({ enum: ['AVAILABLE','HELD','RESERVED','DISABLED'] })
  @Column({ default: 'AVAILABLE' }) status: SeatStatus;
  @ManyToOne(() => Space, s => s.seats, { onDelete: 'CASCADE' }) space: Space;
  @ApiProperty() @UpdateDateColumn() updatedAt: Date;
}
