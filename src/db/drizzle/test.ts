import { drizzleDb } from '.';
import { PostsTable } from './schemas';

async () => {
  const posts = await drizzleDb.select().from(PostsTable);

  console.log('Result: ', posts);
};
