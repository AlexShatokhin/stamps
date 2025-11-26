import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from "bcrypt"
import { JwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getInMs } from 'src/utils/get-in-ms.util';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    private jwtSecret : string;
    private jwtAccessExpiration : string;
    private jwtRefreshExpiration : string;

    constructor(
        private prisma : PrismaService,
        private jwt: JwtService,
        private config: ConfigService) {
            this.jwtSecret = this.config.getOrThrow('JWT_SECRET');
            this.jwtAccessExpiration = this.config.getOrThrow(
                'JWT_ACCESS_EXPIRATION',
            );
            this.jwtRefreshExpiration = this.config.getOrThrow(
                'JWT_REFRESH_EXPIRATION',
		    );
        }

    async auth(id: string, res: Response){
        const {accessToken, refreshToken} = await this.generateTokens(id);
        res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			domain: 'localhost',
			maxAge: getInMs(this.jwtRefreshExpiration),
		});
		return accessToken;
    }
    
    async login({login, password} : LoginDto, res: Response){
        const user = await this.prisma.user.findUnique({
            where: {
                login
            }
        });
        if(!user)
            throw new NotFoundException("")

        const isPasswordRight = await bcrypt.compare(password, user.password);
        if(!isPasswordRight)
            throw new ForbiddenException("")

        return await this.auth(user.id, res);

    }
    async generateTokens(id: string){
        const payload : JwtPayload = {id};

        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: getInMs(this.jwtAccessExpiration)
        });
        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: getInMs(this.jwtRefreshExpiration)
        })

        return {accessToken, refreshToken}
    }

    async refreshTokens(req : Request, res : Response){
        const refreshToken = req.cookies["refreshToken"];
        const payload : JwtPayload = await this.jwt.verifyAsync(refreshToken);

        return this.auth(payload.id, res)
    }

    async logout(res : Response){
        res.cookie("refreshToken", '', {
            maxAge: 0
        })
    }

}
