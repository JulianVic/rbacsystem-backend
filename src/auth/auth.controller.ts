// auth.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    return { message: 'Protected route accessed successfully' };
  }
}