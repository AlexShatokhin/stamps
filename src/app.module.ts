import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CafeModule } from './cafe/cafe.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { StampModule } from './stamp/stamp.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		CafeModule,
		PrismaModule,
		UserModule,
		StampModule,
		ConfigModule.forRoot({ isGlobal: true }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
