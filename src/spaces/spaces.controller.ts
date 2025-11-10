import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { Space } from './space.entity';

@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private readonly service: SpacesService) {}

  @Post()
  @ApiCreatedResponse({ type: Space })
  create(@Body() dto: CreateSpaceDto) { return this.service.create(dto); }

  @Get()
  @ApiOkResponse({ type: [Space] })
  findAll() { return this.service.findAll(); }

  @Post(':id/seed')
  @ApiOkResponse({ type: Space, description: 'Generate seats S1..Sn' })
  seed(@Param('id', ParseIntPipe) id: number) { return this.service.seedSeats(id); }

  @Get(':id')
  @ApiOkResponse({ type: Space })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
}
