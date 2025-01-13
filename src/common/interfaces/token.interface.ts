export interface DecodedToken {
  [key: string]: any;
  sub: string;
  iss: string;
  aud: string[];
  exp: number;
  iat: number;
  accessToken: string;
}