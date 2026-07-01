import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { DrizzleUserRepository } from '../db/repositories/user/drizzle-user-repository';
import { CreateUserUseCase } from '@/application/UseCase/user/create-user.use-case';
import { UserFactory } from '@/domain/entities/user/user.factory';
import { UsernameService } from '@/domain/services/userServices/UsernameService';

//Services
const usernameService = new UsernameService();

//Factories
const userFactory = new UserFactory(usernameService);

// Repositories
export const userRepository: UserRepository = new DrizzleUserRepository();

// UseCases
export const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(
  userFactory,
  userRepository,
);
