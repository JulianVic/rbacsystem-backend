// auth.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { User } from 'src/common/decorators/user.decorator';
import { DecodedToken } from 'src/common/interfaces/token.interface';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  
  @Get('permissions/zitadel/me')
  async getPermissions(@User() decodedToken: DecodedToken) {
    return this.authService.getMyZitadelPermissions(decodedToken.accessToken);
  }
}