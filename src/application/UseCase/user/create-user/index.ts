import { UserFactory } from '@/domain/entities/user/user.factory';
import { Email } from '@/domain/value-objects/Email';
import { Password } from '@/domain/value-objects/Password-hash';
import { CreateUserDTO } from './dto';
import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { TokenService } from '@/domain/services/token/Token';

export class CreateUserUseCase {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(data: CreateUserDTO) {
    const email = new Email(data.email);
    const password = Password.createFromPlainText(data.password);

    const user = this.userFactory.create({
      name: data.name,
      email: email,
      password: password,
    });

    const entity = await this.userRepository.insertNewUser(user);

    const token = await this.tokenService.generate({
      sub: entity.id,
      email: entity.email.getValue(),
      role: entity.role,
    });

    return {
      success: true,
      token: token,
    };
  }
}
