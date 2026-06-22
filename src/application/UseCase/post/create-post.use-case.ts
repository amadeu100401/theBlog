import { CreatePostDTO } from '@/application/DTOs/post/dtos';
import { PostFactory } from '@/domain/entities/posts/post.factory';
import {
  postRepository,
  userRepository,
} from '@/infrastructure/dependencyInjection/container';
import { logColor } from '@/util/log-color';

export class CreatePostUseCase {
  async execute(data: CreatePostDTO) {
    //TODO: criar a função depois
    // const user = await userRepository.findUserById(data.token);

    const user = {
      id: '6db4f744-a188-43e7-9bee-48e5b834bb07',
      name: 'Amadeu Martim',
    };

    if (!user) {
      return {
        success: false,
        post: null,
      };
    }

    const entity = PostFactory.create({
      title: data.title,
      author: user.name,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl,
      published: data.published,
    });

    entity.setAuthorId(user.id);

    const newPost = await postRepository.insertPost(entity);

    return {
      success: true,
      post: newPost,
    };
  }
}
