import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { GrantsModule } from './grants/grants.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [GrantsModule],
})
export class UserModule {}
