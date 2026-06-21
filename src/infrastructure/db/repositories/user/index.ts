import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { DrizzleUserRepository } from './drizzle-user-repository';

export const userRepository: UserRepository = new DrizzleUserRepository();
