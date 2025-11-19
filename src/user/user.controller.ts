import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Res,
	Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { User } from 'generated/prisma/client';
import { RequireRoles, Roles, Authorized, RequireAuth } from '../common/decorators';
import { Role } from 'types/role';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@RequireAuth()
	@Post()
	@ApiOperation({ description: 'Create a new user', summary: 'Create user' })
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@RequireAuth()
	@Get()
	@RequireRoles(Role.SUPERADMIN)
	@ApiOperation({ description: 'Get all users', summary: 'Get all users' })
	findAll() {
		return this.userService.findAll();
	}

	@RequireAuth()
	@Get('me')
	@ApiOperation({ description: 'Get current user by bearer token', summary: 'Get current user' })
	findMe(@Authorized('id') user: User) {
		return user;
	}

	@RequireAuth()
	@Roles(Role.SUPERADMIN)
	@Get(':id')
	@ApiOperation({ description: 'Get a user by ID', summary: 'Get user by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the user to retrieve' })
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id);
	}

	@Post('/login')
	@ApiOperation({ description: 'Get user\'s access token', summary: 'Login user' })
	login(
		@Body() loginDto: LoginDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.userService.login(loginDto, res);
	}

	@Post('/refresh')
	@ApiOperation({ description: 'Refresh access token', summary: 'Refresh access token' })
	refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.userService.refresh(req, res);
	}	

	@RequireAuth()
	@Post('/logout')
	@ApiOperation({ description: 'Logout user', summary: 'Logout user' })
	logout(
		@Res({ passthrough: true }) res: Response,
	) {
		return this.userService.logout(res);
	}

	@RequireAuth()
	@Patch(':id')
	@ApiOperation({ description: 'Update a user by ID', summary: 'Update user' })
	@ApiParam({ name: 'id', description: 'The ID of the user to update' })
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@RequireAuth()
	@Delete(':id')
	@ApiOperation({ description: 'Delete a user by ID', summary: 'Delete user' })
	@ApiParam({ name: 'id', description: 'The ID of the user to delete' })
	remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
