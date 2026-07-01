import { Post } from '@/domain/entities/posts/post.entity';
import { PostInsertModel, PostSelectModel } from '../drizzle/schemas';
import { PostModel } from '@/domain/entities/posts/post.model';

export class PostMapper {
  static toPersistence(post: PostModel): PostInsertModel {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      author: 'Teste Author',
      excerpt: post.excerpt,
      content: post.content,
      coverImageUrl: post.coverImageUrl,
      authorId: post.authorId,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
      published: post.published,
    };
  }

  static toDomain(post: PostSelectModel): Post {
    const rawDomainData: PostModel = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImageUrl: post.coverImageUrl,
      published: post.published,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      author: post.author,
      authorId: post.authorId,
    };

    return new Post(rawDomainData);
  }

  static toDTO(post: PostSelectModel) {
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImageUrl: post.coverImageUrl,
      published: post.published,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      author: post.author,
      authorId: post.authorId,
    };
  }
}
