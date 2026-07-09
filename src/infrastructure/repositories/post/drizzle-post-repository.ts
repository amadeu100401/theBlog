import { PostModel } from '@/domain/entities/posts/post.model';
import { drizzleDb } from '@/infrastructure/db/drizzle';
import {
  PostSelectModel,
  PostsTable,
} from '@/infrastructure/db/drizzle/schemas/post';
import { and, desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { PostMapper } from '@/infrastructure/db/mappers/post.mapper';
import { logColor } from '@/shared/util/log-color';
import { PostRepository } from '@/domain/repositories/post-repository.interface';

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

    return posts.map(post => PostMapper.toDTO(post));
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

  async findById(id: string): Promise<PostSelectModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post?.id, id),
    });

    if (!post) throw new Error('Post não encontroado para o id');

    return post;
  }

  async insertPost(entity: PostModel): Promise<PostModel> {
    try {
      const toPersistence = PostMapper.toPersistence(entity);
      const [post] = await drizzleDb
        .insert(PostsTable)
        .values(toPersistence)
        .returning();

      return PostMapper.toDomain(post);
    } catch (error) {
      logColor('=== DETALHES DO ERRO DO POSTGRES ===');
      console.dir(error);
      logColor('====================================');

      if (error instanceof Error) {
        throw new Error(`Erro no banco de dados: ${error.message}`);
      }

      throw new Error('Erro desconhecido ao criar post na base de dados');
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

  async updatePost(postModel: PostModel): Promise<void> {
    try {
      await drizzleDb
        .update(PostsTable)
        .set(PostMapper.toPersistence(postModel))
        .where(eq(PostsTable.id, postModel.id));
    } catch (error) {
      logColor('=== DETALHES DO ERRO DO POSTGRES ===');
      console.dir(error);
      logColor('====================================');

      if (error instanceof Error) {
        throw new Error(`Erro no banco: ${error.message}`);
      }

      throw new Error('Erro desconhecido ao atualizar o post na base de dados');
    }
  }
}
