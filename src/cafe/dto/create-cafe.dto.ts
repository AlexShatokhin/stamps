import { ApiProperty } from '@nestjs/swagger';
import {
	IsInt,
	IsString,
	Max,
	MaxLength,
	Min,
	MinLength,
} from 'class-validator';

export class CreateCafeDto {
	@IsString()
	@MinLength(3, { message: 'Name must be at least 3 characters long' })
	@MaxLength(100, { message: 'Name must be at most 100 characters long' })
	@ApiProperty({
		description: 'The name of the cafe',
		minLength: 3,
		maxLength: 100,
	})
	name: string;

	@IsString()
	@MinLength(3, { message: 'Location must be at least 3 characters long' })
	@MaxLength(100, { message: 'Location must be at most 100 characters long' })
	@ApiProperty({
		description: 'The location of the cafe',
		minLength: 3,
		maxLength: 100,
	})
	location: string;

	@IsInt()
	@Min(0)
	@Max(100)
	@ApiProperty({
		description: 'The number of stamps the cafe has',
		minimum: 0,
		maximum: 100,
	})
	stamps: number;
}
