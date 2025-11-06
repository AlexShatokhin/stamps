import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';
import { ApiParam, ApiOperation } from '@nestjs/swagger';

@Controller('cafe')
export class CafeController {
	constructor(private readonly cafeService: CafeService) {}

	@Post()
	@ApiOperation({ description: 'Create a new cafe' })
	create(@Body() createCafeDto: CreateCafeDto) {
		return this.cafeService.create(createCafeDto);
	}

	@Get()
	@ApiOperation({ description: 'Get all cafes' })
	findAll() {
		return this.cafeService.findAll();
	}

	@Get(':slug')
	@ApiOperation({ description: 'Get a cafe by slug' })
	@ApiParam({ name: 'slug', description: 'The slug of the cafe to retrieve' })
	findOne(@Param('slug') slug: string) {
		return this.cafeService.findOne(slug);
	}

	@Patch(':slug')
	@ApiOperation({ description: 'Update a cafe by slug' })
	@ApiParam({ name: 'slug', description: 'The slug of the cafe to update' })
	update(@Param('slug') slug: string, @Body() updateCafeDto: UpdateCafeDto) {
		return this.cafeService.update(slug, updateCafeDto);
	}

	@Delete(':slug')
	@ApiOperation({ description: 'Delete a cafe by slug' })
	@ApiParam({ name: 'slug', description: 'The slug of the cafe to delete' })
	remove(@Param('slug') slug: string) {
		return this.cafeService.remove(slug);
	}
}
