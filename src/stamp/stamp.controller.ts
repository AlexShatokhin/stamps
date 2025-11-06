import { Controller, Get, Param } from '@nestjs/common';
import { StampService } from './stamp.service';

@Controller('stamp')
export class StampController {
  constructor(private readonly stampService: StampService) {}

  @Get(':userId')
  setStamp(@Param('userId') userId: string) {
    return this.stampService.setStamp(userId);
  }
}
