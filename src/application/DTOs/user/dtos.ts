import { UserModel } from '@/domain/entities/user/user.model';
export interface PublicUser {
  name: string;
  username: string;
  email: string;
  bio: string;
  role: 'admin' | 'author' | 'reader';
}

export const makePublicUser = (user?: Partial<UserModel>): PublicUser => {
  return {
    name: user?.name || '',
    email: user?.email ? user.email.getValue() : '',
    username: user?.username || '',
    role: !user?.role || user?.role === undefined ? 'author' : user?.role,
    bio: user?.bio || '',
  };
};
