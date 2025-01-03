// interfaces/token.interface.ts
export interface TokenIntrospectionResponse {
  active: boolean;
  sub: string;
  aud: string[];
  exp: number;
  iat: number;
  iss: string;
  'urn:zitadel:iam:org:project:298723041083434695:roles'?: {
    [key: string]: {
      [key: string]: string;
    };
  };
}