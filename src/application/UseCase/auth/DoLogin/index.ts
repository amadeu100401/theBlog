import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { LoginRequest } from './request';
import { LoginResponse } from './response';
import { TokenService } from '@/domain/services/token/Token';

export class DoLogin {
  constructor(
    private readonly repository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  public async execute(data: LoginRequest): Promise<LoginResponse> {
    const email = data.email;
    const password = data.password;

    const isValidEmail = email.isValid();

    if (!isValidEmail || password.trim().length <= 0) {
      throw new Error('Email inválido ou senha inválidos');
    }

    const user = await this.repository.findUserByEmail(email.getValue());

    if (!user) {
      this.ErrorOnValidate();
    }

    const isPasswordValid = user?.passwordHash.compare(password);

    const token = await this.tokenService.generate({
      sub: user?.id as string,
      email: user?.email.getValue() as string,
      role: user?.role as string,
    });

    if (!isPasswordValid) {
      this.ErrorOnValidate();
    }

    return {
      user: {
        id: user?.id as string,
        name: user?.name as string,
        email: user?.email.getValue() as string,
      },
      token: token,
    };
  }

  private ErrorOnValidate = (): never => {
    throw new Error('Email ou senha incorretos');
  };
}
