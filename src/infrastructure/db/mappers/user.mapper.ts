// infra/database/mappers/user.mapper.ts

import { UserInsertModel, UserSelectModel } from '../drizzle/schemas';
import {
  UserModel as UserEntity,
  UserModel,
} from '@/domain/entities/user/user.entity';

export class UserMapper {
  static toPersistence(user: UserEntity): UserInsertModel {
    return {
      id: user.id,

      name: user.name,

      userName: user.username,

      email: user.email,

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
    return {
      id: user.id,

      name: user.name,

      username: user.userName,

      email: user.email,

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
}
