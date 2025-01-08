import { Controller, Get, Put, Post, UseGuards } from '@nestjs/common';
import { ConnService } from './conn.service';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { AccessControlService } from 'src/access-control/access-control.service';
import { DecodedToken } from 'src/common/interfaces/token.interface';
import { User } from 'src/common/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('conn')
export class ConnController {
  constructor(private readonly connService: ConnService, private readonly accessControlService: AccessControlService) {}
  
  @Put('reset_line')
  async resetLine(@User() decodedToken: DecodedToken) {
    this.accessControlService.authorizeAccess({
      ...decodedToken,
      endpoint: 'reset_line',
    })
    return this.connService.resetLine();
  }

  @Get('test_connectivity')
  async testConnectivity(@User() decodedToken: DecodedToken) {
    this.accessControlService.authorizeAccess({
      ...decodedToken,
      endpoint: 'test_connectivity',
    })
    return this.connService.testConnectivity();
  }

  @Post('facture')
  async facture(@User() decodedToken: DecodedToken) {
    this.accessControlService.authorizeAccess({
      ...decodedToken,
      endpoint: 'facture',
    })
    return this.connService.facture();
  }
}
