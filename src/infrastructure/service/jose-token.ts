import {
  TokenPayload,
  TokenService,
  VerifyTokenResult,
} from '@/domain/services/token/Token';
import { EncryptJWT, jwtDecrypt } from 'jose';
import crypto from 'crypto';

export class JoseTokenService implements TokenService {
  private getSecretKey(): Uint8Array {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('Erro ao obter o secret');
    }

    const hash = crypto.createHash('sha256').update(secret).digest();

    return new Uint8Array(hash);
  }

  async generate(payload: TokenPayload): Promise<string> {
    const secretKey = this.getSecretKey();

    const encryptedToken = await new EncryptJWT({ ...payload })
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .setIssuedAt()
      .setExpirationTime(
        payload.type === null || payload.type === 'SESSION' ? '1d' : '15m',
      )
      .encrypt(secretKey);

    return payload.type === 'RESET_PASSWORD'
      ? encodeURIComponent(encryptedToken)
      : encryptedToken;
  }

  async verifiy(token: string): Promise<VerifyTokenResult | null> {
    try {
      const secretKey = this.getSecretKey();

      const decryptedTokenString = token.includes('%')
        ? decodeURIComponent(token)
        : token;

      const { payload } = await jwtDecrypt(decryptedTokenString, secretKey);

      return {
        isValid: true,
        isExpired: false,
        payload: {
          sub: payload.sub as string,
          email: payload.email as string,
          role: payload.role as string,
          type: payload.type as TokenPayload['type'],
        },
      };
    } catch (error) {
      const isExpired =
        (error as { code?: string })?.code === 'ERR_JWT_EXPIRED';

      return {
        isValid: false,
        isExpired: isExpired,
        payload: null,
      };
    }
  }
}
