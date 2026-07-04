import { TokenPayload, TokenService } from '@/domain/services/token/Token';
import { SignJWT, jwtVerify } from 'jose';

export class JoseTokenService implements TokenService {
  private getSecretKey(): Uint8Array {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Erro ao obter o secret');
    }

    return new TextEncoder().encode(secret);
  }

  async generate(payload: TokenPayload): Promise<string> {
    const secretKey = this.getSecretKey();

    return await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secretKey);
  }

  async verifiy(token: string): Promise<TokenPayload | null> {
    try {
      const secretKey = this.getSecretKey();

      const { payload } = await jwtVerify(token, secretKey);

      return {
        sub: payload.sub as string,
        email: payload.email as string,
        role: payload.role as string,
      };
    } catch {
      return null;
    }
  }
}
