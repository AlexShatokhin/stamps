import { Injectable } from '@nestjs/common';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { errorMonitor } from 'events';

@Injectable()
export class CafeService {
	constructor(private prisma: PrismaService) {}

	async create(createCafeDto: CreateCafeDto) {
		try {
			const cafe = await this.prisma.cafe.findFirst({
				where: { name: createCafeDto.name },
			});
			if (cafe) {
				throw new Error('Cafe with this name already exists');
			} else {
				const cafe = await this.prisma.cafe.create({
					data: {
						name: createCafeDto.name,
						location: createCafeDto.location,
						stampsRequired: createCafeDto.stamps,
					},
				});
				return cafe;
			}
		} catch (error) {
			throw new Error('Error creating cafe: ' + error.message);
		}
	}

	async findAll() {
		try {
			return await this.prisma.cafe.findMany();
		} catch (error) {
			throw new Error('Error retrieving all cafes: ' + error.message);
		}
	}

	async findOne(id: string) {
		try {
			const cafe = await this.prisma.cafe.findUnique({
				where: { id: id },
			});
			if (!cafe) throw new Error('Cafe with id: ' + id + ' not found');
			return cafe;
		} catch (error) {
			throw new Error('Error retrieving cafe: ' + error.message);
		}
	}

	async update(id: string, updateCafeDto: UpdateCafeDto) {
		try {
			const cafe = this.findOne(id);
			if (!cafe) {
				throw new Error('Cafe with id: ' + id + ' does not exists');
			} else {
				await this.prisma.cafe.update({
					where: { id: id },
					data: updateCafeDto,
				});
			}
		} catch (error) {
			throw new Error('Error updating cafe: ' + error.message);
		}
	}

	async remove(id: string) {
		try {
			const cafe = this.findOne(id);
			if (!cafe) {
				throw new Error('Cafe with id: ' + id + ' does not exists');
			} else {
				await this.prisma.cafe.delete({
					where: { id: id },
				});
			}
		} catch (error) {
			throw new Error('Error removing cafe: ' + error.message);
		}
	}
}
