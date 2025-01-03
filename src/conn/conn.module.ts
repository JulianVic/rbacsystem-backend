import { Module } from '@nestjs/common';
import { ConnService } from './conn.service';
import { ConnectivityController } from './conn.controller';

@Module({
  controllers: [ConnectivityController],
  providers: [ConnService],
})
export class ConnModule {}
