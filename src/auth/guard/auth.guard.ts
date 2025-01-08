//auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const introspectionUrl =
        "https://myinstance1-crzbwj.us1.zitadel.cloud/oauth/v2/introspect";
      const clientId = "298724085280608006";
      const clientSecret =
        "lpjY8l6j1KLPKhDZvNb25hMC0H1cZe1EsndurIhInsvhV7sTtCKeKlJdSBHTIV3u";

      const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
        "base64"
      );

      const response = await axios({
        method: "POST",
        url: introspectionUrl,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
        data: {
          token,
        },
      });

      if (!response.data.active) {
        throw new UnauthorizedException("Token inválido o expirado");
      }

      request.user = jwt.decode(token);
      return true;
    } catch (error) {
      console.error("Introspection Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new UnauthorizedException("Error al validar el token");
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
