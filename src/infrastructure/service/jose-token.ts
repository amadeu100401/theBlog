import { TokenPayload, TokenService } from '@/domain/services/token/Token';
import { EncryptJWT, jwtDecrypt } from 'jose';

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

    return await new EncryptJWT({ ...payload })
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .encrypt(secretKey);
  }

  async verifiy(token: string): Promise<TokenPayload | null> {
    try {
      const secretKey = this.getSecretKey();

      const { payload } = await jwtDecrypt(token, secretKey);

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
