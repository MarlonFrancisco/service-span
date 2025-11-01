import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlockedTimeService } from './blocked-time.service';
import { BlockedTimeDto } from './dto/blocked-time.dto';

@Controller('partner/stores/:storeId/members/:storeMemberId/blocked-times')
export class BlockedTimeController {
  constructor(private readonly blockedTimeService: BlockedTimeService) {}

  @Get()
  findAll(@Param('storeMemberId') storeMemberId: string) {
    return this.blockedTimeService.findAll(storeMemberId);
  }

  @Post()
  create(
    @Param('storeMemberId') storeMemberId: string,
    @Body() blockedTime: BlockedTimeDto,
  ) {
    return this.blockedTimeService.create(
      new BlockedTimeDto({
        ...blockedTime,
        storeMember: { id: storeMemberId },
      }),
    );
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() blockedTime: BlockedTimeDto) {
    return this.blockedTimeService.update(
      new BlockedTimeDto({ ...blockedTime, id }),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Param('storeMemberId') storeMemberId: string,
  ) {
    await this.blockedTimeService.delete(id);
    return { id, storeMember: { id: storeMemberId } };
  }
}
