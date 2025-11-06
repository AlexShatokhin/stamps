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
import { ApiParam, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiOperation({ description: 'Create a new user' })
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	@ApiOperation({ description: 'Get all users' })
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	@ApiOperation({ description: 'Get a user by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the user to retrieve' })
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ description: 'Update a user by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the user to update' })
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	@ApiOperation({ description: 'Delete a user by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the user to delete' })
	remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
