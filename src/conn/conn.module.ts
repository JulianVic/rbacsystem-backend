import { Module } from '@nestjs/common';
import { ConnService } from './conn.service';
import { ConnController } from './conn.controller';
import { AccessControlModule } from 'src/access-control/access-control.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AccessControlModule,
    ConfigModule,
  ],
  controllers: [ConnController],
  providers: [ConnService],
})
export class ConnModule {}
