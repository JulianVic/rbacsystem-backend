// auth.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  @Get('profile')
  getProfile() {
    return { message: 'Protected route accessed successfully' };
  }
}