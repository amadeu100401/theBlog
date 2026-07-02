import { PostModel } from '@/domain/entities/posts/post.model';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { PostRepository } from '@/domain/repositories/post-repository.interface';
import { PostSelectModel } from '@/infrastructure/db/drizzle/schemas';
import { PostMapper } from '@/infrastructure/db/mappers/post.mapper';

const ROOT_DIR = process.cwd();

const JSON_POST_FILES_PATH = resolve(
  ROOT_DIR,
  'src',
  'infrastructure',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository implements PostRepository {
  updatePost(postModel: PostModel): Promise<void> {
    throw new Error('Method not implemented.');
  }
  insertPost(entity: PostModel): Promise<PostModel> {
    throw new Error('Method not implemented.');
  }

  deletePost(entity: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublishedPublic();
    const post = posts.find(post => post.slug === slug && post.published);

    if (!post) throw new Error('Post não encontrado');

    return post;
  }

  async findAllPublishedPublic(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();

    return posts.filter(post => post.published === true);
  }

  async findById(id: string): Promise<PostSelectModel> {
    const posts = await this.findAllPublishedPublic();
    const post = posts.find(post => post.id === id);

    if (!post || post === undefined) throw new Error('Post não encontrado');

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      author: post.author,
      authorId: post.authorId,
      excerpt: post.excerpt,
      content: post.content,
      coverImageUrl: post.coverImageUrl,
      published: post.published,

      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    };
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POST_FILES_PATH, 'utf-8');

    const parsedJson = JSON.parse(jsonContent);

    const { posts } = parsedJson;

    return posts;
  }
}

//Permite acesso apenas dos métodos assinados na interface
// export const postRepository: PostRepository = new JsonPostRepository();

// (async () => {
//   const posts = await postRepository.findAll();
//   console.log(posts);
//   posts.forEach(post => {
//     console.log(post.id);
//   });
// })();

// (async () => {
//   const post = await postRepository.findById(
//     '99f8add4-7684-4c16-a316-616271db199e',
//   );
//   console.log(post);
// })();
