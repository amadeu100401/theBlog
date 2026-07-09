import { CreatePostUseCase } from '@/application/UseCase/post/create-post.use-case';
import { PostRepository } from '@/domain/repositories/post-repository.interface';
import { SlugService } from '@/domain/services/post/SlugService';
import { PostFactory } from '@/domain/entities/posts/post.factory';
import { UpdatePostUseCase } from '@/application/UseCase/post/update-post.use-case';
import { DeletePostUseCase } from '@/application/UseCase/post/delete-post.use-case';
import { DrizzlePostRepository } from '../repositories/post/drizzle-post-repository';
import { userRepository } from './User';

//Services
const slugService = new SlugService();

//Factories
const postFactory = new PostFactory(slugService);

//Repository
export const postRepository: PostRepository = new DrizzlePostRepository();

export const postModule = {
  postRepository,
  CreatePostUseCase: new CreatePostUseCase(
    postFactory,
    userRepository,
    postRepository,
  ),
  updatePostUseCase: new UpdatePostUseCase(postRepository),
  deletePostUseCase: new DeletePostUseCase(postRepository),
};
