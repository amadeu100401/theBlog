import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from '../post-repository';
import { drizzleDb } from '@/db/drizzle';
import { PostsTable } from '@/db/drizzle/schemas';
import { and, desc } from 'drizzle-orm';
import { logColor } from '@/util/log-color';
import { simulateAwait } from '@/util/async-delay';

export class DrizzlePostRepository implements PostRepository {
  async findBySlugPublic(slug: string): Promise<PostModel | null> {
    simulateAwait('findBySlugPublic');

    logColor('findBySlugPublic', Date.now());
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) =>
        and(eq(post.slug, slug), eq(post.published, true)),
    });

    if (!post) throw new Error('Post não encontroado para slug');

    return {
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  }

  async findAllPublishedPublic(): Promise<PostModel[]> {
    simulateAwait('findAllPublishedPublic', true);

    logColor('findAllPublishedPublic', Date.now());
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: desc(PostsTable.createdAt),
      where: (post, { eq }) => eq(post.published, true),
    });

    return posts.map(post => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));
  }

  async findAll(): Promise<PostModel[]> {
    simulateAwait('findAll');

    logColor('findAll', Date.now());
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: desc(PostsTable.createdAt),
    });

    return posts.map(post => ({
      ...post,
      createdAt: post.createdAt.toDateString(),
      updatedAt: post.updatedAt.toDateString(),
    }));
  }

  async findById(id: string): Promise<PostModel | null> {
    simulateAwait('findById');

    logColor('findById', Date.now());
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post?.id, id),
    });

    if (!post) throw new Error('Post não encontroado para slug');

    return {
      ...post,
      createdAt: post?.createdAt.toISOString(),
      updatedAt: post?.updatedAt.toDateString(),
    };
  }
}

//Usar apenas para testes
// try {
//   (async () => {
//     const repo = new DrizzlePostRepository();
//     const posts = await repo.findAllPublishedPublic();

//     posts.forEach(post =>
//       console.log('Titulo: ' + post.title + ' | situação: ' + post.published),
//     );
//   })();
// } catch (e) {
//   console.log('Erro');
//   console.log('------------RAZÃO-----------');
//   console.log(e);
// }
