import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { JwtPayload } from '../../../auth/auth.service';
import { StoreMemberService } from '../store-member/store-member.service';

/**
 * Guard que valida se o usuário tem acesso à loja (qualquer role)
 *
 * @example
 * @Get(':storeId/details')
 * @UseGuards(JwtAuthGuard, StoreAccessGuard)
 * async getStoreDetails(@Param('storeId') storeId: string) {
 *   // Usuário tem acesso à loja (owner, manager, employee)
 * }
 */
@Injectable()
export class StoreAccessGuard implements CanActivate {
  constructor(private readonly storeMemberService: StoreMemberService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    // Extrai storeId de params ou body
    const storeId = request.params.storeId || request.body?.storeId;

    if (!storeId) {
      throw new ForbiddenException('Store ID is required');
    }

    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }

    // Busca relação user-store
    const storeMember = await this.storeMemberService.findStoreMember(
      storeId as string,
      user.sub,
    );

    if (!storeMember) {
      throw new ForbiddenException('You do not have access to this store');
    }

    // Injeta dados extras no request para uso posterior
    request.storeMember = storeMember;
    request.storeMemberRole = storeMember.role;

    return true;
  }
}
