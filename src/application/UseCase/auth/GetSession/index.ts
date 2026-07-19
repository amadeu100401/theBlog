import { TokenService } from '@/domain/services/token/Token';
import { ErrorType, SessionResponse } from './response';
import { UserRepository } from '@/domain/repositories/user-repository.interface';

export class GetSessionUseCase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(token: string): Promise<SessionResponse> {
    if (!token) {
      return {
        status: false,
        error: ErrorType.ERROR_GET_SESSION,
      };
    }

    const result = await this.tokenService.verifiy(token);

    const payload = result?.payload;

    if (!payload) {
      return {
        status: false,
        error: ErrorType.TOKEN_EXPIRED,
      };
    }

    if (result.isExpired) {
      return {
        status: false,
        error: ErrorType.TOKEN_EXPIRED,
      };
    }

    const user = await this.userRepository.findUserByEmail(payload.email);

    if (!user) {
      return {
        status: false,
        error: ErrorType.ERROR_GET_USER,
      };
    }

    return {
      status: true,
      session: {
        name: user.name,
        email: user.email.getValue(),
        avatarUrl: user.avatarUrl?.getValue(),
      },
    };
  }
}
