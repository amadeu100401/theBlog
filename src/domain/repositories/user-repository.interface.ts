import { UserModel } from '@/domain/entities/user/user.model';

export interface UserRepository {
  findUserById(id: string): Promise<UserModel>;

  findUserByEmail(email: string): Promise<UserModel | null>;

  insertNewUser(entity: UserModel): Promise<UserModel>;
}
