import { ImageUrl } from '@/domain/value-objects/Image-url.value-objects';
import { Email } from '@/domain/value-objects/Email.value-object';
import { Password } from '@/domain/value-objects/Password-hash.value-object';
import { userRoleEnum } from '@/infrastructure/db/drizzle/schemas';

export type UserRole = (typeof userRoleEnum.enumValues)[number];

export interface UserModel {
  id: string;

  name: string;

  username: string;

  email: Email;

  passwordHash: Password;

  role: UserRole;

  isActive: boolean;

  bio: string | null;

  avatarUrl: ImageUrl | null;

  emailVerifiedAt: Date | null;

  resetPasswordToken: string | null;

  resetPasswordExpiresAt: Date | null;

  createdAt: Date;

  updatedAt: Date;
}
