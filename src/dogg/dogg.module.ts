//start copilot ji
import { Module } from '@nestjs/common';
import { DoggService } from './dogg.service';
import { DoggController } from './dogg.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Dogg } from './entities/dogg.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Dogg]),
  ],
  controllers: [DoggController],
  providers: [DoggService],
})
export class DoggModule {}
