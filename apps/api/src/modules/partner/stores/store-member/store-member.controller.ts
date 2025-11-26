import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { StoreMemberDto } from './dto/store-member.dto';
import { StoreMemberService } from './store-member.service';

@Controller('partner/stores/:storeId/members')
export class StoreMemberController {
  constructor(private readonly storeMemberService: StoreMemberService) {}

  @Get()
  async findAll(@Param('storeId') storeId: string) {
    return this.storeMemberService.findStoreMembers(storeId);
  }

  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() storeMemberDto: StoreMemberDto,
  ) {
    return this.storeMemberService.create(
      plainToInstance(StoreMemberDto, { ...storeMemberDto, store: { id: storeId } }),
    );
  }

  @Put(':id')
  async update(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body() storeMemberDto: StoreMemberDto,
  ) {
    return this.storeMemberService.update(
      plainToInstance(StoreMemberDto, { ...storeMemberDto, id, store: { id: storeId } }),
    );
  }

  @Delete(':id')
  async delete(@Param('storeId') storeId: string, @Param('id') id: string) {
    return this.storeMemberService.delete(storeId, id);
  }
}
