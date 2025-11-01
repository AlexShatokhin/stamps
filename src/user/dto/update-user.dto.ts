import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'types/role';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	name: string;
	login: string;
	password: string;
	role: Role;
	cafeId: string;
}
