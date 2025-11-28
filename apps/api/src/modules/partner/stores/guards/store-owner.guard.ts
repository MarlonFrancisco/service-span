import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { JwtPayload } from '../../../auth/auth.service';
import { StoresService } from '../stores.services';

/**
 * Guard que valida se o usuário é Owner ou Manager da loja
 *
 * @example
 * @Delete(':storeId')
 * @UseGuards(JwtAuthGuard, StoreOwnerGuard)
 * async deleteStore(@Param('storeId') storeId: string) {
 *   // Apenas owners/managers podem deletar
 * }
 */
@Injectable()
export class StoreOwnerGuard implements CanActivate {
  constructor(private readonly storesService: StoresService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    // Extrai storeId de params ou body
    const storeId = request.params.id || request.body?.id;

    if (!storeId) {
      throw new ForbiddenException('Store ID is required');
    }

    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }
    // Verifica se é owner ou manager
    const store = await this.storesService.findOne(storeId as string, user.sub);

    if (!store) {
      throw new ForbiddenException(
        'You must be store owner or manager to perform this action',
      );
    }

    return true;
  }
}
