import { PostRepository } from '@/domain/repositories/post-repository.interface';

export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}
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
