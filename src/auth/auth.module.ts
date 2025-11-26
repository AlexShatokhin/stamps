import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
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
})
export class AuthModule {}
