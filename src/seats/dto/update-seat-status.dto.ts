import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
export class UpdateSeatStatusDto {
  @ApiProperty({ enum: ['AVAILABLE','HELD','RESERVED','DISABLED'] })
  @IsIn(['AVAILABLE','HELD','RESERVED','DISABLED'])
  status: 'AVAILABLE'|'HELD'|'RESERVED'|'DISABLED';
}
