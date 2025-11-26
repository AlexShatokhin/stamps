import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from "@nestjs/common";
import { Role } from "types/role";
import { RoleGuard } from "../guards/role.guard";
import { JwtGuard } from "../guards/auth.guard";

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export function RequireRoles(...roles: Role[]){
    return applyDecorators(
        Roles(...roles),
        UseGuards(JwtGuard, RoleGuard))
} 