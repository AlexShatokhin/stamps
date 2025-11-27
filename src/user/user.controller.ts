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
import { User } from 'generated/prisma/client';
import { RequireRoles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           , Authorized, RequireAuth } from '../common/decorators';
import { Role } from 'types/role';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	
	@Post()
	@ApiOperation({ description: 'Create a new user', summary: 'Create user' })
	@RequireAuth()
	@RequireRoles(Role.SUPERADMIN, Role.ADMIN)
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	@ApiOperation({ description: 'Get all users', summary: 'Get all users' })
	@RequireAuth()
	@RequireRoles(Role.SUPERADMIN)
	findAll() {
		return this.userService.findAll();
	}

	@Get('me')
	@ApiOperation({ description: 'Get current user by bearer token', summary: 'Get current user' })
	@RequireAuth()
	findMe(@Authorized() user: User) {
		return user;
	}
	
	@Get(':id')
	@ApiOperation({ description: 'Get a user by ID', summary: 'Get user by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the user to retrieve' })
	@RequireAuth()
	@RequireRoles(Role.SUPERADMIN, Role.ADMIN)
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ description: 'Update a user by ID', summary: 'Update user' })
	@ApiParam({ name: 'id', description: 'The ID of the user to update' })
	@RequireAuth()
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	@ApiOperation({ description: 'Delete a user by ID', summary: 'Delete user' })
	@ApiParam({ name: 'id', description: 'The ID of the user to delete' })
	@RequireAuth()
	@RequireRoles(Role.SUPERADMIN, Role.ADMIN)
	remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
