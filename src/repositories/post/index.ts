import { DrizzlePostRepository } from './drizzle/drizzle-post-repository';
import { PostRepository } from '../../interfaces/post-repository.interface';

export const postRepository: PostRepository = new DrizzlePostRepository();
