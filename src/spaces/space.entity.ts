import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Seat } from '../seats/seat.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Space {
  @ApiProperty() @PrimaryGeneratedColumn() id: number;
  @ApiProperty() @Column() name: string;
  @ApiProperty() @Column() location: string;
  @ApiProperty() @Column({ default: 0 }) totalSeats: number;
  @ApiProperty() @CreateDateColumn() createdAt: Date;
  @ApiProperty() @UpdateDateColumn() updatedAt: Date;
  @OneToMany(() => Seat, s => s.space, { cascade: true }) seats: Seat[];
}
