import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessControlModule } from './access-control/access-control.module';
import { AuthModule } from './auth/auth.module';
import { ConnModule } from './conn/conn.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [AuthModule, AccessControlModule, ConnModule, RoleModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
