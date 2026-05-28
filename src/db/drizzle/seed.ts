import { drizzleDb } from '.';
import { PostsTable } from './schemas';

import { JsonPostRepository } from '@/repositories/post/json-post-repository';

(async () => {
  const jsonRepository = new JsonPostRepository();

  const posts = await jsonRepository.findAll();

  const formattedPosts = posts.map(post => ({
    ...post,

    createdAt: new Date(post.createdAt),

    updatedAt: new Date(post.updatedAt),
  }));

  try {
    console.log('Excluindo dados da tabela - ', new Date().toISOString());
    await drizzleDb.delete(PostsTable);
    console.log('inserindo novos dados da tabela - ', new Date().toISOString());
    await drizzleDb.insert(PostsTable).values(formattedPosts as []);
    console.log('Finalizado - ', new Date().toISOString());

    // const posts = await drizzleDb.select().from(PostsTable);

    posts.forEach(post => {
      console.log(post);
    });
  } catch (e) {
    console.log('Erro ao inserir dados na base.');
    console.error(e);
  }
})();
