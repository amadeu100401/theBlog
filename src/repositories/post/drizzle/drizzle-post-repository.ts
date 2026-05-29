import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from '../post-repository';
import { drizzleDb } from '@/db/drizzle';
import { PostsTable } from '@/db/drizzle/schemas';
import { and, desc } from 'drizzle-orm';

export class DrizzlePostRepository implements PostRepository {
  async findBySlugPublic(slug: string): Promise<PostModel | null> {
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
