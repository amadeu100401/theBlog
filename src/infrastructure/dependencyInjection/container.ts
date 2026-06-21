import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { DrizzleUserRepository } from '../db/repositories/user/drizzle-user-repository';
import { DrizzlePostRepository } from '../db/repositories/post/drizzle/drizzle-post-repository';
import { PostRepository } from '@/domain/repositories/post-repository.interface';
import { CreateUserUseCase } from '@/application/UseCase/user/create-user.use-case';

// UseCases
export const createUserUseCase: CreateUserUseCase = new CreateUserUseCase();

// Repositories
export const userRepository: UserRepository = new DrizzleUserRepository();
export const postRepository: PostRepository = new DrizzlePostRepository();
