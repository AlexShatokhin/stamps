import { ApiProperty } from '@nestjs/swagger';
import { IsString, Max, MaxLength, MinLength } from 'class-validator';
import { Role } from 'types/role';

export class CreateUserDto {
	@IsString()
	@MinLength(3, { message: 'Name must be at least 3 characters long' })
	@MaxLength(30, { message: 'Name must be at most 30 characters long' })
	@ApiProperty({
		description: 'The name of the user',
		minLength: 3,
		maxLength: 30,
	})
	name: string;

	@IsString()
	@MinLength(3, { message: 'Login must be at least 3 characters long' })
	@MaxLength(20, { message: 'Login must be at most 20 characters long' })
	@ApiProperty({
		description: 'The login of the user',
		minLength: 3,
		maxLength: 20,
	})
	login: string;

	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@MaxLength(50, { message: 'Password must be at most 50 characters long' })
	@ApiProperty({
		description: 'The password of the user',
		minLength: 6,
		maxLength: 50,
	})
	password: string;

	@ApiProperty({ description: 'The role of the user', enum: Role })
	role: Role;

	@IsString()
	@ApiProperty({ description: 'The ID of the cafe the user belongs to' })
	cafeId: string;
}
