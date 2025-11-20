import { UseGuards } from '@nestjs/common';
import { OptionalJwtAuthGuard } from '../guards/optional-jwt-auth.guard';

export const OptionalAuth = () => UseGuards(OptionalJwtAuthGuard);
