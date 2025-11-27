import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { JwtGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';

@Module({
	controllers: [UserController],
	providers: [UserService, JwtGuard, RoleGuard],
	imports: [PrismaModule],
	exports: [UserService]
})
export class UserModule {}
