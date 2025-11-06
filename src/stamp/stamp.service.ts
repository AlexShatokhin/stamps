import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserStamp } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'types/role';
import { SetStampDto } from './dto/set-stamps.dto';
import { ClearStampDto } from './dto/clear-stamps.dto';

@Injectable()
export class StampService {
    constructor(private prisma: PrismaService) {}

    async setStamp({userId, baristaId, stampCount = 1}: SetStampDto) {
        let result : UserStamp | null = null;

        const barista = await this.prisma.user.findFirst({
            where: {id: baristaId, role: Role.BARISTA}
        });
        if(!barista)
            throw new NotFoundException('Barista with ID: ' + baristaId + ' not found');

        const cafe = await this.prisma.cafeEmployee.findFirst({
            where: {userId: baristaId}
        });

        if(!cafe)
            throw new NotFoundException('Cafe for barista with ID: ' + baristaId + ' not found');

        const user = await this.prisma.user.findFirst({
            where: {id: userId}
        });
        if(!user)
            throw new NotFoundException('User with ID: ' + userId + ' not found');

        const isStampsExists = await this.prisma.userStamp.findFirst({
            where: {userId: userId, cafeId: cafe?.cafeId}
        })
        if(isStampsExists){
            result = await this.prisma.userStamp.update({
                where: {userId: userId, cafeId: cafe?.cafeId},
                data: {
                    stampCount: +stampCount + +isStampsExists.stampCount
                }
            })
        } else {
            result = await this.prisma.userStamp.create({
                data: {
                    stampCount: +stampCount,
                    userId,
                    cafeId: cafe?.cafeId
                }
            })
        }
        return result;
    }

    async getStampByUserIdAndCafeId(userId: string, cafeId: string) {
        const stamp = await this.prisma.userStamp.findFirst({
            where: {userId: userId, cafeId: cafeId}
        });
        return stamp;
    }

    async getAllStampsByUserId(userId: string) {
        const stamps =  await this.prisma.userStamp.findMany({
            where: {userId: userId}
        });
        return stamps;
    }
    

    async clearStamps({userId, cafeId} : ClearStampDto) {
        const cafe = await this.prisma.cafe.findFirst({
            where: {id: cafeId}
        })
        if(!cafe)
            throw new NotFoundException('Cafe with ID: ' + cafeId + ' not found');

        const userStamp = await this.prisma.userStamp.findFirst({
            where: {userId: userId, cafeId: cafeId}
        })
        if(!userStamp)
            throw new NotFoundException('User with ID: ' + userId + ' not found');
        
        if(+userStamp.stampCount < +cafe.stampsRequired)
            throw new ForbiddenException('Not enough stamps to redeem');

        const updatedStamps = await this.prisma.userStamp.update({
            where: {userId: userId, cafeId: cafeId},
            data: {
                stampCount: +userStamp.stampCount - +cafe.stampsRequired
            }
        })

        return updatedStamps;
    }
}
