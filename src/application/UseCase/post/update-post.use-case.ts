import { UpdatePostDTO } from '@/application/DTOs/post/dtos';
import { PostRepository } from '@/domain/repositories/post-repository.interface';
import { PostMapper } from '@/infrastructure/db/mappers/post.mapper';

export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute(data: UpdatePostDTO) {
    const post = await this.postRepository.findById(data.postId);

    if (!post) {
      throw new Error('Post não encontrado.');
    }

    const postEntity = PostMapper.toDomain(post);

    postEntity.updatePost(data);

    await this.postRepository.updatePost(postEntity);

    //Return the new slug
    data.slug = post.slug;

    return {
      success: true,
      post: data,
    };
  }
}
