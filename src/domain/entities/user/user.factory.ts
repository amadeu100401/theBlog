import { v4 as uuid } from 'uuid';
import { UserModel } from './user.model';
import { User } from './user.entity';

interface CreateUserProps {
  name: string;
  username: string;
  email: string;
  passwordHash: string;
}

export class UserFactory {
  static create(props: CreateUserProps): User {
    const now = new Date();

    const rawUser: UserModel = {
      id: uuid(),

      name: props.name,
      username: props.username,
      email: props.email,

      passwordHash: props.passwordHash,

      role: 'reader',

      isActive: true,

      bio: null,
      avatarUrl: null,

      emailVerifiedAt: null,

      resetPasswordToken: null,
      resetPasswordExpiresAt: null,

      createdAt: now,
      updatedAt: now,
    };

    return new User(rawUser);
  }
}
