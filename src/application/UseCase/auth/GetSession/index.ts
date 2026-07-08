import { TokenService } from '@/domain/services/token/Token';
import { SessionResponse } from './response';
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
        error: 'Não foi possível obter dados da sessão',
      };
    }

    const payload = await this.tokenService.verifiy(token);

    if (!payload) {
      return {
        status: false,
        error: 'Não foi possível obter dados da sessão',
      };
    }

    const user = await this.userRepository.findUserByEmail(payload.email);

    if (!user) {
      return {
        status: false,
        error: 'Não foi possível obter dados da sessão',
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
