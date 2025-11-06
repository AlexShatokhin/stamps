import { Module } from '@nestjs/common';
import { StampService } from './stamp.service';
import { StampController } from './stamp.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StampController],
  providers: [StampService],
  imports: [PrismaModule]
})
export class StampModule {}
