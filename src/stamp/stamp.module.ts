import { Module } from '@nestjs/common';
import { StampService } from './stamp.service';
import { StampController } from './stamp.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [StampController],
  providers: [StampService, JwtGuard, RoleGuard, JwtStrategy],
  imports: [PrismaModule, UserModule]
})
export class StampModule {}
