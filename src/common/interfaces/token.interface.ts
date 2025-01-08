export interface DecodedToken {
  [key: string]: any;  // Para las claims personalizadas
  sub: string;
  iss: string;
  aud: string[];
  exp: number;
  iat: number;
}