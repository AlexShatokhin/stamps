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
import { RequireAuth, RequireRoles } from 'src/common/decorators';
import { Role } from 'types/role';
import { LinkWithCafeDto } from './dto/link-with-cafe.dto';

@Controller('cafe')
export class CafeController {
	constructor(private readonly cafeService: CafeService) {}

	@Get()
	@ApiOperation({ description: 'Get all cafes', summary: 'Get all cafes' })
	@RequireAuth()
	findAll() {
		return this.cafeService.findAll();
	}

	@Get(':slug')
	@ApiOperation({
		description: 'Get a cafe by slug',
		summary: 'Get cafe by slug',
	})
	@ApiParam({ name: 'slug', description: 'The slug of the cafe to retrieve' })
	@RequireAuth()
	findOne(@Param('slug') slug: string) {
		return this.cafeService.findOne(slug);
	}

	@Get(':slug/employees')
	@ApiOperation({
		description: 'Get a cafe employees by slug',
		summary: 'Get cafe employees by slug',
	})
	@ApiParam({ name: 'slug', description: 'The slug of the cafe to retrieve' })
	@RequireAuth()
	getCafeEmployees(@Param('slug') slug: string) {
		return this.cafeService.getCafeEmployees(slug);
	}

	@Post()
	@ApiOperation({ description: 'Create a new cafe', summary: 'Create cafe' })
	@RequireAuth()
	@RequireRoles(Role.SUPERADMIN, Role.ADMIN)
	create(@Body() createCafeDto: CreateCafeDto) {
		return this.cafeService.create(createCafeDto);
	}

	@Post('/link')
	@ApiOperation({ description: '', summary: '' })
	@RequireAuth()
	@RequireRoles(Role.SUPERADMIN, Role.ADMIN, Role.BARISTA)
	linkWithCafe(@Body() body: LinkWithCafeDto) {
		return this.cafeService.link(body);
	}

	@Patch(':slug')
	@ApiOperation({
		description: 'Update a cafe by slug',
		summary: 'Update cafe by slug',
	})
	@ApiParam({ name: 'slug', description: 'The slug of the cafe to update' })
	@RequireAuth()
	@RequireRoles(Role.SUPERADMIN)
	update(@Param('slug') slug: string, @Body() updateCafeDto: UpdateCafeDto) {
		return this.cafeService.update(slug, updateCafeDto);
	}

	@Delete(':slug')
	@ApiOperation({
		description: 'Delete a cafe by slug',
		summary: 'Delete cafe by slug',
	})
	@ApiParam({ name: 'slug', description: 'The slug of the cafe to delete' })
	@RequireAuth()
	@RequireRoles(Role.SUPERADMIN)
	remove(@Param('slug') slug: string) {
		return this.cafeService.remove(slug);
	}
}
