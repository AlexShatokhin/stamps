import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slug from 'slug';
import { LinkWithCafeDto } from './dto/link-with-cafe.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CafeService {
	constructor(
		private prisma: PrismaService,
		private user: UserService,
	) {}

	async create(createCafeDto: CreateCafeDto) {
		const cafe = await this.prisma.cafe.findFirst({
			where: { name: createCafeDto.name },
		});
		if (cafe) {
			throw new ConflictException('Cafe with this name already exists');
		} else {
			const cafe = await this.prisma.cafe.create({
				data: {
					slug: slug(createCafeDto.name, { lower: true }),
					name: createCafeDto.name,
					location: createCafeDto.location,
					stampsRequired: createCafeDto.stamps,
				},
			});
			return cafe;
		}
	}

	async findAll() {
		try {
			return await this.prisma.cafe.findMany();
		} catch (error) {
			throw new Error('Error retrieving all cafes: ' + error.message);
		}
	}

	async findOne(slug: string) {
		const cafe = await this.prisma.cafe.findUnique({
			where: { slug },
			select: {
				id: true,
				slug: true,
				name: true,
				location: true,
				stampsRequired: true,
			},
		});
		if (!cafe)
			throw new NotFoundException(
				'Cafe with slug: ' + slug + ' not found',
			);
		return cafe;
	}

	async update(slug: string, {name, location, stamps}: UpdateCafeDto) {
		try {
			const cafe = this.findOne(slug);
			if (!cafe) {
				throw new Error('Cafe with slug: ' + slug + ' does not exists');
			} else {
				await this.prisma.cafe.update({
					where: { slug },
					data: {
						name,
						location,
						stampsRequired: stamps
					},
				});
			}
		} catch (error) {
			throw new Error('Error updating cafe: ' + error.message);
		}
	}

	async remove(slug: string) {
		try {
			const cafe = this.findOne(slug);
			if (!cafe) {
				throw new Error('Cafe with slug: ' + slug + ' does not exists');
			} else {
				await this.prisma.cafe.delete({
					where: { slug },
				});
			}
		} catch (error) {
			throw new Error('Error removing cafe: ' + error.message);
		}
	}

	async link({ cafeSlug, userId }: LinkWithCafeDto) {
		const user = await this.user.findOne(userId);
		const cafe = await this.findOne(cafeSlug);

		const link = await this.prisma.cafeEmployee.create({
			data: {
				userId: user.id,
				cafeId: cafe.id,
			},
		});

		return link;
	}

	async getCafeEmployees(slug: string) {
		const cafe = await this.findOne(slug);
		const employees = await this.prisma.cafeEmployee.findMany({
			where: {
				cafeId: cafe.id,
			},
			include: {
				user: true,
			},
		});

		return employees.map((item) => ({
			name: item.user.name,
			id: item.user.id,
			isActive: item.user.active,
			role: item.user.role
		}));
	}
}
