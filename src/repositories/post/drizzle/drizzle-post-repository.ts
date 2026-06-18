import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from '../../../interfaces/post-repository.interface';
import { drizzleDb } from '@/infrastructure/db/drizzle';
import { PostsTable } from '@/infrastructure/db/drizzle/schemas';
import { and, desc } from 'drizzle-orm';
import { logColor } from '@/util/log-color';
import { simulateAwait } from '@/util/async-delay';
import { eq } from 'drizzle-orm';

export class DrizzlePostRepository implements PostRepository {
  async findBySlugPublic(slug: string): Promise<PostModel | null> {
    simulateAwait('findBySlugPublic');
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

  async insertPost(entity: PostModel): Promise<PostModel> {
    try {
      await drizzleDb.insert(PostsTable).values({
        ...entity,
        createdAt: new Date(entity.createdAt),
        updatedAt: new Date(entity.updatedAt),
      });

      return entity;
    } catch {
      throw new Error('Erro ao persistir post na base de dados.');
    }
  }

  async deletePost(id: string): Promise<boolean> {
    if (!id || id === undefined) return false;

    const result = await drizzleDb
      .delete(PostsTable)
      .where(eq(PostsTable.id, id));
    const rowsCount = result.rowCount;

    return rowsCount !== null && rowsCount >= 1;
  }

  async updatePost(
    id: string,
    newPost: Omit<PostModel, 'id' | 'slug' | 'createdAt'>,
  ): Promise<PostModel> {
    const oldPost = await this.findById(id);

    if (!oldPost) {
      throw new Error('Post não existe na base de dados');
    }

    const updatedAtDate = new Date();
    const postData = {
      author: newPost.author,
      content: newPost.content,
      coverImageUrl: newPost.coverImageUrl,
      excerpt: newPost.excerpt,
      published: newPost.published,
      title: newPost.title,
      updatedAt: updatedAtDate,
    };

    await drizzleDb
      .update(PostsTable)
      .set(postData)
      .where(eq(PostsTable.id, id));

    return {
      ...oldPost,
      ...postData,
      updatedAt: updatedAtDate.toISOString(),
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
