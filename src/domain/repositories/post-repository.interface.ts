import { PostModel } from '@/domain/entities/posts/post.model';
import { PostSelectModel } from '@/infrastructure/db/drizzle/schemas';

export interface PostRepository {
  findAll(): Promise<PostModel[]>;
  findAllPublishedPublic(): Promise<PostModel[]>;
  findById(id: string): Promise<PostSelectModel>;
  findBySlugPublic(slug: string): Promise<PostModel | null>;

  insertPost(entity: PostModel): Promise<PostModel>;
  deletePost(entity: string): Promise<boolean>;
  updatePost(postModel: PostModel): Promise<void>;
}
