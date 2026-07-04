export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
}

export interface TokenService {
  generate(payload: TokenPayload): Promise<string>;
  verifiy(token: string): Promise<TokenPayload | null>;
}
