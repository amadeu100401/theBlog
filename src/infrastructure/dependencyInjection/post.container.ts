import { CreatePostUseCase } from '@/application/UseCase/post/create-post.use-case';
import { PostRepository } from '@/domain/repositories/post-repository.interface';
import { DrizzlePostRepository } from '../db/repositories/post/drizzle/drizzle-post-repository';

//Repository
export const postRepository: PostRepository = new DrizzlePostRepository();

//UseCase
export const createPostUseCase: CreatePostUseCase = new CreatePostUseCase();
