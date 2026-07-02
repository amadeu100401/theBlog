import { v4 as uuid } from 'uuid';
import { UserModel } from './user.model';
import { User } from './user.entity';
import { UsernameService } from '@/domain/services/userServices/UsernameService';
import { Email } from '@/domain/value-objects/Email.value-object';

interface CreateUserProps {
  name: string;
  email: Email;
  passwordHash: string;
}

export class UserFactory {
  constructor(private usernameService: UsernameService) {}

  public create(props: CreateUserProps): User {
    const now = new Date();
    const generatedUsername = this.usernameService.generate(props.name);

    const rawUser: UserModel = {
      id: uuid(),

      name: props.name,
      username: generatedUsername,
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
