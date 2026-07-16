import { UserModel } from '@/domain/entities/user/user.model';
export interface PublicUser {
  name: string;
  username: string;
  email: string;
  bio: string;
  role: 'admin' | 'author' | 'reader';
}

export const makePublicUser = (user?: Partial<UserModel>): PublicUser => {
  let emailValue = '';

  if (user?.email) {
    if (typeof user.email.getValue === 'function') {
      emailValue = user.email.getValue();
    } else if (typeof user.email === 'object' && 'value' in user.email) {
      emailValue = (user.email as unknown as { value?: string }).value || '';
    } else if (typeof user.email === 'string') {
      emailValue = user.email;
    }
  }
  return {
    name: user?.name || '',
    email: emailValue,
    username: user?.username || '',
    role: !user?.role || user?.role === undefined ? 'author' : user?.role,
    bio: user?.bio || '',
  };
};
