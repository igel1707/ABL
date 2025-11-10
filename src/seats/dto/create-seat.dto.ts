import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
export class CreateSeatDto {
  @ApiProperty({ example: 'S1' }) @IsString() @IsNotEmpty() label: string;
  @ApiProperty({ enum: ['AVAILABLE','HELD','RESERVED','DISABLED'], required: false })
  @IsIn(['AVAILABLE','HELD','RESERVED','DISABLED'])
  status?: 'AVAILABLE'|'HELD'|'RESERVED'|'DISABLED' = 'AVAILABLE';
}
