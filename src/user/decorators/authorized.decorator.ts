import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { User } from "generated/prisma/client";


export const Authorized = createParamDecorator(
    (data: keyof User | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request;
        const user = request.user;
        return data ? user?.[data] : user;
    }
)