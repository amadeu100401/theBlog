import { DoLogin } from '@/application/UseCase/auth/DoLogin';
import { userRepository } from './User';
import { JoseTokenService } from '../service/jose-token';
import { TokenService } from '@/domain/services/token/Token';
import { GetSessionUseCase } from '@/application/UseCase/auth/GetSession';

export const tokenService: TokenService = new JoseTokenService();

export const authModule = {
  get doLogin() {
    return new DoLogin(userRepository, tokenService);
  },
  get getSession() {
    return new GetSessionUseCase(tokenService, userRepository);
  },
};
