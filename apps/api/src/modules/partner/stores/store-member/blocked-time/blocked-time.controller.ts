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
import {
  BlockedTimeDto,
  CreateBulkBlockedTimeDto,
  DeleteBulkBlockedTimeDto,
} from './dto/blocked-time.dto';

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

  @Post('bulk')
  createBulk(
    @Param('storeMemberId') storeMemberId: string,
    @Body() createBulkDto: CreateBulkBlockedTimeDto,
  ) {
    return this.blockedTimeService.createBulk(storeMemberId, createBulkDto);
  }

  @Post('bulk/delete')
  deleteBulk(
    @Param('storeMemberId') storeMemberId: string,
    @Body() deleteBulkDto: DeleteBulkBlockedTimeDto,
  ) {
    return this.blockedTimeService.deleteBulk(storeMemberId, deleteBulkDto);
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
