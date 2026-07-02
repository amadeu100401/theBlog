import { CreateUserDTO } from '@/application/DTOs/user/dtos';
import { UserFactory } from '@/domain/entities/user/user.factory';
import { DrizzleUserRepository } from '@/infrastructure/db/repositories/user/drizzle-user-repository';
import { hashPassword } from '@/auth/auth-manual';
import { Email } from '@/domain/value-objects/Email.value-object';

export class CreateUserUseCase {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly userRepository: DrizzleUserRepository,
  ) {}

  async execute(data: CreateUserDTO) {
    const passwordHash = await hashPassword(data.password);

    const email = new Email(data.email);

    const user = this.userFactory.create({
      name: data.name,
      email: email,
      passwordHash,
    });

    const entity = await this.userRepository.insertNewUser(user);

    return {
      success: true,
      userId: entity.id,
    };
  }
}
