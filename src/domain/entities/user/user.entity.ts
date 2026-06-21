import { userRoleEnum } from '@/infrastructure/db/drizzle/schemas';

export type UserRole = (typeof userRoleEnum.enumValues)[number];

export interface UserModel {
  id: string;

  name: string;

  username: string;

  email: string;

  passwordHash: string;

  role: UserRole;

  isActive: boolean;

  bio: string | null;

  avatarUrl: string | null;

  emailVerifiedAt: Date | null;

  resetPasswordToken: string | null;

  resetPasswordExpiresAt: Date | null;

  createdAt: Date;

  updatedAt: Date;
}
