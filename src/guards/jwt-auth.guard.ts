// guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Validar el token usando el endpoint de introspección de ZITADEL
      const introspectionResponse = await firstValueFrom(
        this.httpService.post(
          'https://myinstance1-crzbwj.us1.zitadel.cloud/oauth/v2/introspect',
          new URLSearchParams({ token }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`
            }
          }
        )
      );

      const tokenInfo = introspectionResponse.data;

      if (!tokenInfo.active) {
        throw new UnauthorizedException('Token inactivo o inválido');
      }

      // Añadir la información del token al request
      request.user = {
        ...tokenInfo,
        roles: Object.keys(tokenInfo['urn:zitadel:iam:org:project:298723041083434695:roles'] || {})
      };

      return true;
    } catch (error) {
      console.error('Error al procesar el token:', error);
      throw new UnauthorizedException('Token inválido');
    }
  }
}