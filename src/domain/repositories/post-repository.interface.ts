import { PostModel } from '@/domain/entities/posts/post-model';

export interface PostRepository {
  findAll(): Promise<PostModel[]>;
  findAllPublishedPublic(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel | null>;
  findBySlugPublic(slug: string): Promise<PostModel | null>;

  insertPost(entity: PostModel): Promise<PostModel>;
  deletePost(entity: string): Promise<boolean>;
  updatePost(
    id: string,
    newPost: Omit<PostModel, 'id' | 'slug' | 'createdAt'>,
  ): Promise<PostModel>;
}
