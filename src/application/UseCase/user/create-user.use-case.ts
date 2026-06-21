import { CreateUserDTO } from '@/application/DTOs/user/dtos';
import { UserFactory } from '@/domain/entities/user/user.factory';
import { userRepository } from '@/infrastructure/dependencyInjection/container';
import { hashPassword } from '@/lib/auth/auth-manual';

export class CreateUserUseCase {
  async execute(data: CreateUserDTO) {
    const passwordHash = await hashPassword(data.password);

    const username =
      data.email.split('@')[0] + Math.floor(Math.random() * 1000);

    const user = UserFactory.create({
      name: data.name,
      username,
      email: data.email,
      passwordHash,
    });

    const entity = await userRepository.insertNewUser(user);

    return {
      success: true,
      userId: entity.id,
    };
  }
}
