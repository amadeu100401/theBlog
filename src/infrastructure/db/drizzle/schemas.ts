import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

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

export const PostsTable = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  authorId: uuid('author_id')
    .references(() => UserTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  excerpt: varchar('excerpt', { length: 500 }).notNull(),
  content: text('content').notNull(),
  coverImageUrl: varchar('cover_image_url', {
    length: 500,
  }).notNull(),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// export const postsRelations = relations(PostsTable, ({ one }) => ({
//   author: one(UserTable, {
//     fields: [PostsTable.authorId],
//     references: [UserTable.id],
//   }),
// }));

// export const usersRelations = relations(UserTable, ({ many }) => ({
//   posts: many(PostsTable),
// }));

export type PostSelectModel = InferSelectModel<typeof PostsTable>;
export type PostInsertModel = InferInsertModel<typeof PostsTable>;

export type UserSelectModel = InferSelectModel<typeof UserTable>;
export type UserInsertModel = InferInsertModel<typeof UserTable>;
