import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "generated/prisma/client";
import { Role } from "types/role";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext){
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);

        if(!requiredRoles)
            return true;


        const request = context.switchToHttp().getRequest();
        const user = request.user as User;
        console.log(request.user)
        if(!user) 
            return false

        console.log(user)
        return requiredRoles.includes(user.role as Role);
    }
}