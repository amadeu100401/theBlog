// infra/database/mappers/user.mapper.ts

import { User } from '@/domain/entities/user/user.entity';
import { UserInsertModel, UserSelectModel } from '../drizzle/schemas';
import { UserModel } from '@/domain/entities/user/user.model';
import { Email } from '@/domain/value-objects/Email.value-object';

export class UserMapper {
  static toPersistence(user: UserModel): UserInsertModel {
    return {
      id: user.id,

      name: user.name,

      userName: user.username,

      email: user.email.getValue(),

      passwordHash: user.passwordHash,

      role: user.role,

      isActive: user.isActive,

      bio: user.bio,

      avatarUrl: user.avatarUrl,

      emailVerifiedAt: user.emailVerifiedAt,

      resetPasswordToken: user.resetPasswordToken,

      resetPasswordExpiresAt: user.resetPasswordExpiresAt,

      createdAt: user.createdAt,

      updatedAt: user.updatedAt,
    };
  }

  static toDomain(user: UserSelectModel): UserModel {
    const rawDomainData: UserModel = {
      id: user.id,
      name: user.name,
      username: user.userName,
      email: new Email(user.email),
      passwordHash: user.passwordHash,
      role: user.role,
      isActive: user.isActive,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      emailVerifiedAt: user.emailVerifiedAt,
      resetPasswordToken: user.resetPasswordToken,
      resetPasswordExpiresAt: user.resetPasswordExpiresAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return new User(rawDomainData);
  }
}
