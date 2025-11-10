import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatStatusDto } from './dto/update-seat-status.dto';
import { Seat } from './seat.entity';

@ApiTags('seats')
@Controller('spaces/:spaceId/seats')
export class SeatsController {
  constructor(private readonly service: SeatsService) {}

  @Post()
  @ApiOkResponse({ type: Seat })
  create(@Param('spaceId', ParseIntPipe) spaceId: number, @Body() dto: CreateSeatDto) {
    return this.service.create(spaceId, dto);
  }

  @Get()
  @ApiOkResponse({ type: [Seat] })
  list(@Param('spaceId', ParseIntPipe) spaceId: number,
       @Query('status') status?: 'AVAILABLE'|'HELD'|'RESERVED'|'DISABLED') {
    return this.service.list(spaceId, status);
  }

  @Patch(':seatId/status')
  @ApiOkResponse({ type: Seat })
  updateStatus(@Param('seatId', ParseIntPipe) seatId: number, @Body() dto: UpdateSeatStatusDto) {
    return this.service.updateStatus(seatId, dto.status);
  }

  @Post(':seatId/lock')   @ApiOkResponse({ type: Seat })
  lock(@Param('seatId', ParseIntPipe) seatId: number) { return this.service.lock(seatId); }

  @Post(':seatId/unlock') @ApiOkResponse({ type: Seat })
  unlock(@Param('seatId', ParseIntPipe) seatId: number) { return this.service.unlock(seatId); }
}
