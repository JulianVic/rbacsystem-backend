import { Controller, Post, Body, Put, Param, Delete, UseGuards, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto'
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { DecodedToken } from 'src/common/interfaces/token.interface';
import { User } from 'src/common/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @User() decodedToken: DecodedToken) {
    return this.roleService.create(createRoleDto, decodedToken.accessToken);
  }

  @Put(':roleKey')
  update(@Param('roleKey') roleKey: string, @Body() updateRoleDto: UpdateRoleDto, @User() decodedToken: DecodedToken) {
    return this.roleService.update(roleKey, updateRoleDto, decodedToken.accessToken);
  }

  @Delete(':roleKey')
  remove(@Param('roleKey') roleKey: string, @User() decodedToken: DecodedToken) {
    return this.roleService.remove(roleKey, decodedToken.accessToken);
  }

  @Get()
  read(@User() decodedToken: DecodedToken) {
    return this.roleService.read(decodedToken.accessToken);
  }
}
