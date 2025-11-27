import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { StampService } from './stamp.service';
import { ApiOperation } from '@nestjs/swagger';
import { SetStampDto } from './dto/set-stamps.dto';
import { ClearStampDto } from './dto/clear-stamps.dto';
import { RequireAuth, RequireRoles } from 'src/common/decorators';
import { Role } from 'types/role';

@Controller('/stamp')
export class StampController {
	constructor(private readonly stampService: StampService) {}

	@Post('/')
	@ApiOperation({ description: 'Set stamps for a user', summary: 'Set stamps' })
	@RequireAuth()
	@RequireRoles(Role.SUPERADMIN, Role.BARISTA)
	setStamp(@Body() SetStampDto: SetStampDto) {
		return this.stampService.setStamp(SetStampDto);
	}

	@Delete('/clear')
	@ApiOperation({ description: 'Clear stamps for a user in a specific cafe', summary: 'Clear stamps' })
	@RequireAuth()
	@RequireRoles(Role.SUPERADMIN, Role.BARISTA)
	clearStamps(@Body() clearStampDto: ClearStampDto) {
		return this.stampService.clearStamps(clearStampDto);
	}

	@Get('/:userId')
	@ApiOperation({ description: 'Get all stamps for a user', summary: 'Get all stamps for a user' })
	@RequireAuth()
	getAllStampsByUserId(@Param('userId') userId: string) {
		return this.stampService.getAllStampsByUserId(userId);
	}

	@Get('/:userId/:cafeId')
	@ApiOperation({ description: 'Get stamp for a user in a specific cafe', summary: 'Get stamp for a user in a specific cafe' })
	@RequireAuth()
	getStampByUserIdAndCafeId(@Param('userId') userId: string, @Param('cafeId') cafeId: string) {
		return this.stampService.getStampByUserIdAndCafeId(userId, cafeId);
	}

}
