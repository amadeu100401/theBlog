import { UserModel } from '@/domain/entities/user/user.entity';

export interface UserRepository {
  findUserById(id: string): Promise<UserModel>;

  insertNewUser(entity: UserModel): Promise<UserModel>;
}
