import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly ISSUER: string;
  private readonly ZITADEL_CONECTIVIDAD_APP_ID: string;
  private readonly ZITADEL_CONECTIVIDAD_APP_SECRET: string;

  constructor(private configService: ConfigService){
    this.ISSUER = this.configService.get<string>("ISSUER");
    this.ZITADEL_CONECTIVIDAD_APP_ID = this.configService.get<string>("ZITADEL_CONECTIVIDAD_APP_ID");
    this.ZITADEL_CONECTIVIDAD_APP_SECRET = this.configService.get<string>("ZITADEL_CONECTIVIDAD_APP_SECRET");    
  }

  async validateToken(token: string): Promise<any> {
    try {
      const basicAuth = Buffer.from(`${this.ZITADEL_CONECTIVIDAD_APP_ID}:${this.ZITADEL_CONECTIVIDAD_APP_SECRET}`).toString('base64');
      const endpoint = `${this.ISSUER}/oauth/v2/introspect`;
      const response = await axios.post(endpoint,
        `token=${token}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basicAuth}`
          }
        }
      );

      if (!response.data.active) {
        throw new UnauthorizedException('Token inválido o expirado');
      }

      return response.data;
    } catch (error) {
      throw new UnauthorizedException('Error al validar el token' + error);
    }
  }

  async getMyZitadelPermissions(token: string): Promise<any> {
    await this.validateToken(token);

    const endpoint = `${this.ISSUER}/auth/v1/permissions/zitadel/me/_search`;
    const response = await axios.post(endpoint, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    return response.data;
  }
}
