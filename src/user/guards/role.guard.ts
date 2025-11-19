import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "generated/prisma/client";
import { ROLES_KEY } from "src/common/decorators";
import { Role } from "types/role";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext){
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if(!requiredRoles)
            return true;


        const request = context.switchToHttp().getRequest();
        const user = request.user as User;
        if(!user) 
            return false

        return requiredRoles.includes(user.role as Role);
    }
}