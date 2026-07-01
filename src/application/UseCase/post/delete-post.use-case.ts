import { DrizzlePostRepository } from '@/infrastructure/db/repositories/post/drizzle/drizzle-post-repository';

export class DeletePostUseCase {
  constructor(private readonly postRepository: DrizzlePostRepository) {}
  public async execute(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post || post === undefined) {
      throw new Error('Post não encontrado na base de dados');
    }

    await this.postRepository.deletePost(id);

    return {
      success: true,
      slug: post.slug,
    };
  }
}
