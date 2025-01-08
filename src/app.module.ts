import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from './access-control/access-control.module';
import { ConnModule } from './conn/conn.module';

@Module({
  imports: [AuthModule, AccessControlModule, ConnModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
