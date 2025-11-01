import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from 'types/role';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		try {
			const user = await this.prisma.user.findFirst({
				where: { login: createUserDto.login },
			});
			if (user) {
				throw new Error('User with this login already exists');
			} else {
				const hashedPassword = await bcrypt.hash(
					createUserDto.password,
					10,
				);
				await this.prisma.user.create({
					data: {
						name: createUserDto.name,
						login: createUserDto.login,
						password: hashedPassword,
						role: createUserDto.role,
					},
				});
				const createdUser = await this.prisma.user.findFirst({
					where: { login: createUserDto.login },
				});
				if (!createdUser) {
					throw new Error('Error retrieving created user');
				}
				switch (createUserDto.role) {
					case Role.ADMIN:
					case Role.BARISTA:
						await this.prisma.cafeEmployee.create({
							data: {
								userId: createdUser?.id,
								cafeId: createUserDto.cafeId,
							},
						});
				}
			}
		} catch (error) {
			throw new Error('Error creating user: ' + error.message);
		}
	}

	async findAll() {
		try {
			return await this.prisma.user.findMany();
		} catch (error) {
			throw new Error('Error finding all users: ' + error.message);
		}
	}

	async findOne(id: string) {
		try {
			const user = await this.prisma.user.findUnique({
				where: { id },
			});
			if (!user) {
				throw new Error('User not found');
			}
			return user;
		} catch (error) {
			throw new Error('Error finding user: ' + error.message);
		}
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		try {
			const user = this.findOne(id);
			if (!user) {
				throw new Error('User with id: ' + id + ' does not exists');
			} else {
				const hashedPassword = await bcrypt.hash(
					updateUserDto.password,
					10,
				);
				await this.prisma.user.update({
					where: { id: id },
					data: {
						name: updateUserDto.name,
						login: updateUserDto.login,
						password: hashedPassword,
						role: updateUserDto.role,
					},
				});
				if (updateUserDto.role === Role.USER) {
					await this.prisma.cafeEmployee.deleteMany({
						where: { userId: id },
					});
				} else {
					await this.prisma.cafeEmployee.updateMany({
						where: { userId: id },
						data: {
							cafeId: updateUserDto.cafeId,
						},
					});
				}
			}
		} catch (error) {
			throw new Error('Error updating user: ' + error.message);
		}
	}

	async remove(id: string) {
		try {
			const user = this.findOne(id);
			if (!user) {
				throw new Error('User with id: ' + id + ' does not exists');
			} else {
				await this.prisma.user.delete({
					where: { id: id },
				});
			}
		} catch (error) {
			throw new Error('Error removing user: ' + error.message);
		}
	}
}
