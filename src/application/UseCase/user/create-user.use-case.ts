import { CreateUserDTO } from '@/application/DTOs/user/dtos';
import { UserFactory } from '@/domain/entities/user/user.factory';
import { DrizzleUserRepository } from '@/infrastructure/db/repositories/user/drizzle-user-repository';
import { Email } from '@/domain/value-objects/Email.value-object';
import { Password } from '@/domain/value-objects/Password-hash.value-object';

export class CreateUserUseCase {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly userRepository: DrizzleUserRepository,
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
