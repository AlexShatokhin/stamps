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
import { ApiParam, ApiProperty } from '@nestjs/swagger';

@Controller('cafe')
export class CafeController {
	constructor(private readonly cafeService: CafeService) {}

	@Post()
	@ApiProperty({ description: 'Create a new cafe' })
	create(@Body() createCafeDto: CreateCafeDto) {
		return this.cafeService.create(createCafeDto);
	}

	@Get()
	@ApiProperty({ description: 'Get all cafes' })
	findAll() {
		return this.cafeService.findAll();
	}

	@Get(':id')
	@ApiProperty({ description: 'Get a cafe by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the cafe to retrieve' })
	findOne(@Param('id') id: string) {
		return this.cafeService.findOne(id);
	}

	@Patch(':id')
	@ApiProperty({ description: 'Update a cafe by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the cafe to update' })
	update(@Param('id') id: string, @Body() updateCafeDto: UpdateCafeDto) {
		return this.cafeService.update(id, updateCafeDto);
	}

	@Delete(':id')
	@ApiProperty({ description: 'Delete a cafe by ID' })
	@ApiParam({ name: 'id', description: 'The ID of the cafe to delete' })
	remove(@Param('id') id: string) {
		return this.cafeService.remove(id);
	}
}
