import { Module } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeController } from './cafe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
	controllers: [CafeController],
	providers: [CafeService],
	imports: [PrismaModule, UserModule],
})
export class CafeModule {}
