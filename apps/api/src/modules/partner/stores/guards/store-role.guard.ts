import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { JwtPayload } from '../../../auth/auth.service';
import { StoreMemberService } from '../store-member/store-member.service';

export const REQUIRED_ROLES_KEY = 'requiredRoles';

/**
 * Decorator para especificar roles permitidas
 *
 * @example
 * @Put(':storeId')
 * @RequireStoreRoles('owner', 'manager')
 * @UseGuards(JwtAuthGuard, StoreRoleGuard)
 * async updateStore() {
 *   // Apenas owner e manager podem acessar
 * }
 */
export const RequireStoreRoles = (...roles: string[]) =>
  SetMetadata(REQUIRED_ROLES_KEY, roles);

/**
 * Guard que valida roles específicas da loja
 * Usa o decorator @RequireStoreRoles para especificar as roles permitidas
 */
@Injectable()
export class StoreRoleGuard implements CanActivate {
  constructor(
    private readonly storeMemberService: StoreMemberService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extrai roles requeridas do decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      REQUIRED_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      // Se não especificou roles, permite qualquer acesso
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    const storeId = request.params.storeId || request.body?.storeId;

    if (!storeId) {
      throw new ForbiddenException('Store ID is required');
    }

    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }

    // Busca relação com validação de role
    const storeMember = await this.storeMemberService.findStoreMember(
      storeId as string,
      user.sub,
    );

    if (!storeMember) {
      throw new ForbiddenException(
        `You must have one of these roles: ${requiredRoles.join(', ')}`,
      );
    }

    // Injeta dados no request
    request.storeMember = storeMember;
    request.storeMemberRole = storeMember.role;

    return true;
  }
}
