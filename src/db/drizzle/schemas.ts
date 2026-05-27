import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

import {
  uuid,
  varchar,
  pgTable,
  boolean,
  timestamp,
  text,
} from 'drizzle-orm/pg-core';

export const PostsTable = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  excerto: varchar('excerto', { length: 500 }).notNull(),
  content: text('content').notNull(),
  coverImageUrl: varchar('cover_image_url', {
    length: 500,
  }).notNull(),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type PostsTableSelectModel = InferSelectModel<typeof PostsTable>;
export type PostsTableInsertModel = InferInsertModel<typeof PostsTable>;
