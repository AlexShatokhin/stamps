import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
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
}
