import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
export class CreateSpaceDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() location: string;
  @ApiProperty({ example: 10 }) @IsInt() @Min(0) totalSeats: number;
}
