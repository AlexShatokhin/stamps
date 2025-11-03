import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiProperty } from '@nestjs/swagger';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiProperty({ description: 'Create a new user' })
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	@ApiProperty({ description: 'Get all users' })
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	@ApiProperty({ description: 'Get a user by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the user to retrieve' })
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id);
	}

	@Patch(':id')
	@ApiProperty({ description: 'Update a user by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the user to update' })
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	@ApiProperty({ description: 'Delete a user by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the user to delete' })
	remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
