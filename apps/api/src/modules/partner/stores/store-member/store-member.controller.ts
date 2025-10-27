import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { StoreMemberDto } from './store-member.dto';
import { StoreMemberService } from './store-member.service';

@Controller('partner/stores/:storeId/members')
@UseGuards(JwtAuthGuard)
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
      new StoreMemberDto({ ...storeMemberDto, store: { id: storeId } }),
    );
  }

  @Put(':id')
  async update(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body() storeMemberDto: StoreMemberDto,
  ) {
    return this.storeMemberService.update(
      new StoreMemberDto({ ...storeMemberDto, id, store: { id: storeId } }),
    );
  }

  @Delete(':id')
  async delete(@Param('storeId') storeId: string, @Param('id') id: string) {
    return this.storeMemberService.delete(storeId, id);
  }
}
