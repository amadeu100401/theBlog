import { DoLogin } from '@/application/UseCase/auth/login';
import { userRepository } from './User';
import { JoseTokenService } from '../service/jose-token';
import { TokenService } from '@/domain/services/token/Token';

const tokenService: TokenService = new JoseTokenService();

export const authModule = {
  tokenService,
  doLogin: new DoLogin(userRepository, tokenService),
};
