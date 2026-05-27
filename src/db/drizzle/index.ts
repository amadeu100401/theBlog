import { drizzle } from 'drizzle-orm/node-postgres';
import { PostsTable } from './schemas';
import { Client } from 'pg';

const postgresDBPath = process.env.DATABASE_URL;

const client = new Client({
  connectionString: postgresDBPath,
});

export const drizzleDb = drizzle(client, {
  schema: {
    posts: PostsTable,
  },
  logger: true,
});
