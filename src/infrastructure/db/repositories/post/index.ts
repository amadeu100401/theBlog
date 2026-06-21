import { DrizzlePostRepository } from './drizzle/drizzle-post-repository';
import { PostRepository } from '../../../../domain/repositories/post-repository.interface';

export const postRepository: PostRepository = new DrizzlePostRepository();
