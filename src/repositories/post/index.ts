import { DrizzlePostRepository } from './drizzle/drizzle-post-repository';
import { PostRepository } from './post-repository';

export const postRepository: PostRepository = new DrizzlePostRepository();
