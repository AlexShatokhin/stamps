import { Module } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeController } from './cafe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Module({
	controllers: [CafeController],
	providers: [CafeService, RoleGuard, JwtGuard, JwtStrategy],
	imports: [PrismaModule, UserModule],
})
export class CafeModule {}
