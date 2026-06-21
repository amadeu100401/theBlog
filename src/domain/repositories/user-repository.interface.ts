import { UserModel } from '@/domain/entities/user/user.model';

export interface UserRepository {
  findUserById(id: string): Promise<UserModel>;

  insertNewUser(entity: UserModel): Promise<UserModel>;
}
