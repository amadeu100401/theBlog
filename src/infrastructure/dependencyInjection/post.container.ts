import { CreatePostUseCase } from '@/application/UseCase/post/create-post.use-case';
import { PostRepository } from '@/domain/repositories/post-repository.interface';
import { DrizzlePostRepository } from '../db/repositories/post/drizzle/drizzle-post-repository';
import { SlugService } from '@/domain/services/postServices/SlugService';
import { PostFactory } from '@/domain/entities/posts/post.factory';
import { UpdatePostUseCase } from '@/application/UseCase/post/update-post.use-case';
import { DeletePostUseCase } from '@/application/UseCase/post/delete-post.use-case';

//Services
const slugService = new SlugService();

//Factories
const postFactory = new PostFactory(slugService);

//Repository
export const postRepository: PostRepository = new DrizzlePostRepository();

//UseCase
export const createPostUseCase: CreatePostUseCase = new CreatePostUseCase(
  postFactory,
  postRepository,
);

export const updatePostUseCase: UpdatePostUseCase = new UpdatePostUseCase(
  postRepository,
);

export const deletePostUseCase: DeletePostUseCase = new DeletePostUseCase(
  postRepository,
);
