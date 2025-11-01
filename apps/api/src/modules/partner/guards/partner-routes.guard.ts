import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Injectable()
export class PartnerRoutesGuard extends JwtAuthGuard {
  constructor(reflector: Reflector) {
    super(reflector);
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const path = request.route?.path || request.url;

    // Aplica autenticação apenas para rotas que começam com /partner
    if (path.startsWith('/partner')) {
      return super.canActivate(context);
    }

    // Para outras rotas, permite acesso
    return true;
  }
}
