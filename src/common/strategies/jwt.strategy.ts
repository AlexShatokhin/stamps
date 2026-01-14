import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../../user/interfaces/jwt.interface";
import { UserService } from "../../user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
            algorithms: ['HS256'],
        })
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService.findOne(payload.id);
        if(!user || !user.isActive)
            throw new UnauthorizedException("User is not active")

        return user;
    }
}