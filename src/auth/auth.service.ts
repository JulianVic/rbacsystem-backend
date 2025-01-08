import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly clientId = '298724085280608006';
  private readonly clientSecret = 'lpjY8l6j1KLPKhDZvNb25hMC0H1cZe1EsndurIhInsvhV7sTtCKeKlJdSBHTIV3u';
  private readonly introspectionUrl = 'https://myinstance1-crzbwj.us1.zitadel.cloud/oauth/v2/introspect';

  async validateToken(token: string): Promise<any> {
    try {
      const basicAuth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      
      const response = await axios.post(
        this.introspectionUrl,
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
}
