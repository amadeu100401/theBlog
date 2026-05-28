import { drizzle } from 'drizzle-orm/node-postgres';
import { PostsTable } from './schemas';
import { Pool } from 'pg';
import 'dotenv/config';

const postgresDBPath = process.env.DATABASE_URL;

const client = new Pool({
  connectionString: postgresDBPath,
});

export const drizzleDb = drizzle(client, {
  schema: {
    posts: PostsTable,
  },
  logger: false,
});

try {
  client.connect();
} catch (e) {
  console.log('Erro ao conectar no DB');
}
