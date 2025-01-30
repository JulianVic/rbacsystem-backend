import { Controller, Get, Post, Body, Param, Delete, Headers, UseGuards, Put } from '@nestjs/common';
import { GrantsService } from './grants.service';
import { CreateGrantDto } from './dto/create-grant.dto';
import { UpdateGrantDto } from './dto/update-grant.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { SearchGrantsDto } from './dto/search-grants.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class GrantsController {
  constructor(private readonly grantsService: GrantsService) {}

  @Post(':userId/grants')
  create(
    @Param('userId') userId: string,
    @Body() createGrantDto: CreateGrantDto,
    @Headers('Authorization') token: string,
  ) {
    return this.grantsService.create(userId, createGrantDto, token);
  }

  @Post('grants')
  findAll(
    @Body() searchGrantsDto: SearchGrantsDto,
    @Headers('Authorization') token: string,
  ) {
    return this.grantsService.findAll(searchGrantsDto, token);
  }
  
  @Get(':userId/grants/:grantId')
  findOne(
    @Param('userId') userId: string,
    @Param('grantId') grantId: string,
    @Headers('Authorization') token: string,
  ) {
    return this.grantsService.findOne(userId, grantId, token);
  }

  @Put(':userId/grants/:grantId')
  update(
    @Param('userId') userId: string,
    @Param('grantId') grantId: string,
    @Body() updateGrantDto: UpdateGrantDto,
    @Headers('Authorization') token: string,
  ) {
    return this.grantsService.update(userId, grantId, updateGrantDto, token);
  }

  @Delete(':userId/grants/:grantId')
  remove(
    @Param('userId') userId: string,
    @Param('grantId') grantId: string,
    @Headers('Authorization') token: string,
  ) {
    return this.grantsService.remove(userId, grantId, token);
  }

}
