import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  uuid,
  varchar,
  pgTable,
  boolean,
  timestamp,
  text,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['admin', 'author', 'reader']);

export const UserTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  userName: varchar('user_name', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  resetPasswordToken: varchar('reset_password_token', { length: 255 }),
  resetPasswordExpiresAt: timestamp('reset_password_expires_at', {
    withTimezone: true,
  }),
  bio: text('bio'),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  role: userRoleEnum('role').default('reader').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  emailVerifiedAt: timestamp('email_verified_at', {
    withTimezone: true,
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type UserSelectModel = InferSelectModel<typeof UserTable>;
export type UserInsertModel = InferInsertModel<typeof UserTable>;
