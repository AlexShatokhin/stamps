import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { StampService } from './stamp.service';
import { ApiOperation } from '@nestjs/swagger';
import { SetStampDto } from './dto/set-stamps.dto';
import { ClearStampDto } from './dto/clear-stamps.dto';

@Controller('/stamp')
export class StampController {
	constructor(private readonly stampService: StampService) {}

	@Post('/')
	@ApiOperation({ description: 'Set stamps for a user' })
	setStamp(@Body() SetStampDto: SetStampDto) {
		return this.stampService.setStamp(SetStampDto);
	}

	@Delete('/clear')
	@ApiOperation({ description: 'Clear stamps for a user in a specific cafe' })
	clearStamps(@Body() clearStampDto: ClearStampDto) {
		return this.stampService.clearStamps(clearStampDto);
	}

	@Get('/:userId')
	@ApiOperation({ description: 'Get all stamps for a user' })
	getAllStampsByUserId(@Param('userId') userId: string) {
		return this.stampService.getAllStampsByUserId(userId);
	}

	@Get('/:userId/:cafeId')
	@ApiOperation({ description: 'Get stamp for a user in a specific cafe' })
	getStampByUserIdAndCafeId(@Param('userId') userId: string, @Param('cafeId') cafeId: string) {
		return this.stampService.getStampByUserIdAndCafeId(userId, cafeId);
	}

}
