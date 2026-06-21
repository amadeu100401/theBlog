import { UserModel } from '@/domain/entities/user/user.entity';

export type PublicUser = Pick<
  UserModel,
  'name' | 'username' | 'email' | 'bio' | 'role'
>;

export const makePublicUser = (user?: Partial<UserModel>): PublicUser => {
  return {
    name: user?.name || '',
    email: user?.email || '',
    username: user?.username || '',
    role: user?.role || 'author',
    bio: user?.bio || '',
  };
};

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}
