import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CafeModule } from './cafe/cafe.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { StampModule } from './stamp/stamp.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'images'),
            serveRoot: '/images',
            serveStaticOptions: {
                index: false, 
            },
		}),
		CafeModule,
		PrismaModule,
		UserModule,
		StampModule,
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
