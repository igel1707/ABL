import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacesModule } from './spaces/spaces.module';
import { SeatsModule } from './seats/seats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'seat.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SpacesModule,
    SeatsModule,
  ],
})
export class AppModule {}
