import { TokenService } from '@/domain/services/token/Token';
import { RequestCodeRequest } from './request';
import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { CacheProvider } from '@/domain/contracts/cache-provider';
import { ErrorValidateCodeType, ResponseValidateCode } from './response';
import { logColor } from '@/shared/util/log-color';

export class VerifyCodeUseCase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly cacheProvider: CacheProvider,
  ) {}

  public async execute({
    email,
    code,
  }: RequestCodeRequest): Promise<ResponseValidateCode> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user)
      return {
        success: false,
        error: ErrorValidateCodeType.USER_NOT_FOUNDED,
      };

    const cacheKey = `reset_code_${user.email.getValue()}`;

    const cachedRequest = await this.cacheProvider.get(cacheKey);

    if (!cachedRequest) {
      return {
        success: false,
        error: ErrorValidateCodeType.CODE_EXPIRED,
      };
    }

    if (code === cachedRequest) {
      const token = await this.tokenService.generate({
        email: user.email.getValue(),
        role: user.role,
        sub: user.id,
        type: 'RESET_PASSWORD',
      });

      return {
        success: true,
        token: token,
      };
    } else {
      return {
        success: false,
        error: ErrorValidateCodeType.CODE_INVALID,
      };
    }
  }
}
