import { Role } from 'types/role';

export class CreateUserDto {
	name: string;
	login: string;
	password: string;
	role: Role;
	cafeId: string;
}
