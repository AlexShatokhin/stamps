import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StampService {
    constructor(private prisma: PrismaService) {}

    async setStamp(userId: string) {
    }
}
