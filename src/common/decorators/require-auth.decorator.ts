import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../guards/auth.guard";


export function RequireAuth(){
    return applyDecorators(UseGuards(JwtGuard));
}