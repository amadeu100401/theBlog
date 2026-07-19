import { DoLogin } from '@/application/UseCase/auth/DoLogin';
import { userRepository } from './User';
import { JoseTokenService } from '../service/jose-token';
import { TokenService } from '@/domain/services/token/Token';
import { GetSessionUseCase } from '@/application/UseCase/auth/GetSession';
import { ForgetPasswordUseCase } from '@/application/UseCase/auth/ForgetPassword';
import { EmailServices } from '@/domain/services/email/Email';
import { EmailService } from '../email/services/resend-email.service';
import { CacheProvider } from '@/domain/contracts/cache-provider';
import { ValkeyCacheProvider } from '../cache/redis/valkey-provider';
import { VerifyCodeUseCase } from '@/application/UseCase/auth/ValidateResetPasswordCode';

export const tokenService: TokenService = new JoseTokenService();
export const forgetPasswordService: EmailServices = new EmailService();
export const cacheProviderService: CacheProvider = new ValkeyCacheProvider();

export const authModule = {
  get doLogin() {
    return new DoLogin(userRepository, tokenService);
  },
  get getUserByToken() {
    return new GetSessionUseCase(tokenService, userRepository);
  },
  get forgetPassword() {
    return new ForgetPasswordUseCase(
      tokenService,
      userRepository,
      forgetPasswordService,
      cacheProviderService,
    );
  },
  get varifyResentPasswordCode() {
    return new VerifyCodeUseCase(
      tokenService,
      userRepository,
      cacheProviderService,
    );
  },
};
