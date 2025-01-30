import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()//
  create(
    @Body() createUserDto: CreateUserDto,
    @Headers('Authorization') token: string
  ) {
    return this.userService.create(createUserDto, token);
  }

  @Get()
  findAll(
    @Headers('Authorization') token: string
  ) {
    return this.userService.findAll(token);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Headers('Authorization') token: string
  ) {
    return this.userService.update(id, updateUserDto, token);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('Authorization') token: string
  ) {
    return this.userService.remove(id, token);
  }
}
