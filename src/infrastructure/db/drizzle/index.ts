import { drizzle } from 'drizzle-orm/node-postgres';
import { PostsTable } from './schemas/post';
import { UserTable } from './schemas/user';
import { Pool } from 'pg';
import 'dotenv/config';
import { logColor } from '@/shared/util/log-color';

const postgresDBPath = process.env.DATABASE_URL;

const client = new Pool({
  connectionString: postgresDBPath,
});

export const drizzleDb = drizzle(client, {
  schema: {
    posts: PostsTable,
    users: UserTable,
  },
  logger: false,
});

try {
  client.connect();
} catch (e) {
  logColor('Erro ao conectar no DB');
}
