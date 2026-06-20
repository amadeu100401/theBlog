import { UserModel } from '@/models/user/user-model';

export type PublicUser = Pick<UserModel, 'name' | 'username' | 'bio' | 'role'>;

export const makePublicUser = (user?: Partial<UserModel>): PublicUser => {
  return {
    name: user?.name || '',
    username: user?.username || '',
    role: user?.role || '',
    bio: user?.bio || '',
  };
};
