import { UserFactory } from '@/domain/entities/user/user.factory';
import { Email } from '@/domain/value-objects/Email';
import { Password } from '@/domain/value-objects/Password-hash';
import { CreateUserDTO } from './dto';
import { UserRepository } from '@/domain/repositories/user-repository.interface';

export class CreateUserUseCase {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly userRepository: UserRepository,
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

    return {
      success: true,
      userId: entity.id,
    };
  }
}
