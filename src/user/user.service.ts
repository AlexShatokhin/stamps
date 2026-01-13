import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from 'types/role';
import fs from 'fs';
import path from 'path';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const user = await this.prisma.user.findFirst({
			where: { login: createUserDto.login },
		});
		if (user) {
			throw new ConflictException('User with this login already exists');
		} else {
			const hashedPassword = await bcrypt.hash(
				createUserDto.password,
				10,
			);
			const user = await this.prisma.user.create({
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
					if (createUserDto.cafeId) {
						const cafe = await this.prisma.cafe.findFirst({
							where: { id: createUserDto.cafeId },
						});
						if (!cafe) {
							await this.prisma.user.delete({
								where: { id: createdUser.id },
							});
							throw new BadRequestException(
								'Cafe with ID: ' +
									createUserDto.cafeId +
									' does not exist',
							);
						}

						await this.prisma.cafeEmployee.create({
							data: {
								userId: createdUser?.id,
								cafeId: createUserDto.cafeId,
							},
						});
					} else {
						await this.prisma.user.delete({
							where: { id: createdUser.id },
						});
						throw new BadRequestException(
							'Cafe ID must be provided for ADMIN and BARISTA roles',
						);
					}
			}

			return user;
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
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				UserStamp: true,
			},
		});
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return {
			id: user.id,
			name: user.name,
			login: user.login,
			role: user.role,
			stamps: user.UserStamp,
			isActive: user.active
		};
	}

	async getCafeByUserId(id: string) {
		const user = await this.findOne(id);
		if (user) {
			const cafeId = await this.prisma.cafeEmployee.findFirst({
				where: { userId: user.id },
			});
			if (!cafeId)
				throw new NotFoundException('Cafe with this user id not found');

			return await this.prisma.cafe.findUnique({
				where: { id: cafeId.cafeId },
			});
		}
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		try {
			const user = this.findOne(id);
			let hashedPassword: string | undefined;
			if (updateUserDto.password) {
				hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
			}

			await this.prisma.user.update({
				where: { id: id },
				data: hashedPassword
					? { ...updateUserDto, password: hashedPassword }
					: { ...updateUserDto },
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

	uploadImage(file: Express.Multer.File) {
		const extension = file.mimetype.split('/')[1];
		fs.writeFileSync(
			'./images/' + file.originalname.split('.')[0] + '.' + extension,
			file.buffer,
		);
	}
}
