export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  type?: 'RESET_PASSWORD' | 'SESSION';
}

export type VerifyTokenResult = {
  isValid: boolean;
  isExpired: boolean;
  payload: TokenPayload | null;
};

export interface TokenService {
  generate(payload: TokenPayload): Promise<string>;
  verifiy(token: string): Promise<VerifyTokenResult | null>;
}
