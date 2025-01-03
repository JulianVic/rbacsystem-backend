// src/services/zitadel.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwksClient } from 'jwks-rsa';

@Injectable()
export class ZitadelService implements OnModuleInit {
  private jwksClient: JwksClient;

  async onModuleInit() {
    this.jwksClient = new JwksClient({
      jwksUri: 'https://myinstance1-crzbwj.us1.zitadel.cloud/oauth/v2/keys'
    });
  }

  async getPublicKey(kid: string): Promise<string> {
    try {
      const key = await this.jwksClient.getSigningKey(kid);
      return key.getPublicKey();
    } catch (error) {
      console.error('Error getting public key:', error);
      throw error;
    }
  }
}