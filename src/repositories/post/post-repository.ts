import { PostModel } from '@/models/posts/post-model';

export interface PostRepository {
  findAll(): Promise<PostModel[]>;
  findAllPublished(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  findBySlug(slug: string): Promise<PostModel>;
}
