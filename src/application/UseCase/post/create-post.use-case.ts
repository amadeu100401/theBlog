import { CreatePostDTO } from '@/application/DTOs/post/dtos';
import { PostFactory } from '@/domain/entities/posts/post.factory';
import { DrizzlePostRepository } from '@/infrastructure/repositories/post/drizzle-post-repository';
export class CreatePostUseCase {
  constructor(
    private readonly postFactory: PostFactory,
    private readonly postRepository: DrizzlePostRepository,
  ) {}

  async execute(data: CreatePostDTO) {
    //TODO: buscar o usurio logado para passar para a entidade de post

    const user = {
      id: data.token,
      name: 'Amadeu Martim',
    };

    if (!user) {
      return {
        success: false,
        post: null,
      };
    }

    const entity = this.postFactory.create({
      title: data.title,
      author: user.name,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl,
      published: data.published,
    });

    entity.setAuthorId(user.id);

    const newPost = await this.postRepository.insertPost(entity);

    return {
      success: true,
      post: newPost,
    };
  }
}
