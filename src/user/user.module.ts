import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@Module({
	controllers: [UserController],
	providers: [UserService, JwtStrategy, JwtGuard, RoleGuard],
	imports: [
		PrismaModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (ConfigService: ConfigService) => ({
				secret: ConfigService.getOrThrow('JWT_SECRET'),
				signOptions: {
					algorithm: 'HS256',
					expiresIn: ConfigService.getOrThrow(
						'JWT_ACCESS_EXPIRATION',
					),
				},
				verifyOptions: {
					algorithms: ['HS256'],
				}
			}),
			inject: [ConfigService],
		}),
	],
	exports: [JwtGuard, RoleGuard, JwtStrategy]
})
export class UserModule {}
