import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { CreateUserUseCase } from '@/application/UseCase/user/create-user';
import { UserFactory } from '@/domain/entities/user/user.factory';
import { UsernameService } from '@/domain/services/user/UsernameService';
import { DrizzleUserRepository } from '../repositories/user/drizzle-user-repository';

//Services
const usernameService = new UsernameService();

//Factories
const userFactory = new UserFactory(usernameService);

// Repositories
export const userRepository: UserRepository = new DrizzleUserRepository();

export const userModule = {
  userRepository,
  createUserUseCase: new CreateUserUseCase(userFactory, userRepository),
};
