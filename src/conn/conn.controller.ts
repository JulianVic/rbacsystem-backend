import { Controller, Get, Req, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
@Controller('conn')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConnectivityController {

  @Get('debug-token')
  debugToken(@Req() request) {
    const user = request.user;

    return {
      tokenInfo: {
        user: user,
        roles: user['urn:zitadel:iam:org:project:298723041083434695:roles'],
        metadata: user['urn:zitadel:iam:user:metadata']
      },
      decodedRoles: Object.keys(user['urn:zitadel:iam:org:project:298723041083434695:roles'] || {}),
      message: 'Información del token decodificado'
    };
  }

  @Put('reset_line')
  @Roles('admin', 'gerent', 'facilities')
  resetLine() {
    return {
      message: 'Línea reseteada exitosamente'
    };//
  }

  @Get('test_connectivity')
  @Roles('support', 'facilities', 'gerent')
  testConnectivity() {
    return {
      message: 'Conectividad probada exitosamente'
    };
  }

  @Post('facture')
  @Roles('admin', 'gerent')
  facture() {
    return {
      message: 'Factura generada exitosamente'
    };
  }
}