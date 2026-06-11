import { PostModel } from '@/models/posts/post-model';

export interface PostRepository {
  findAll(): Promise<PostModel[]>;
  findAllPublishedPublic(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel | null>;
  findBySlugPublic(slug: string): Promise<PostModel | null>;
}
