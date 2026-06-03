import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { simulateAwait } from '@/util/async-delay';

const ROOT_DIR = process.cwd();

const JSON_POST_FILES_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository implements PostRepository {
  async findAll(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();

    simulateAwait('findAll');

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    console.log('SLug: ' + slug);
    await simulateAwait('findBySlugPublic');

    const posts = await this.findAllPublishedPublic();
    const post = posts.find(post => post.slug === slug && post.published);

    if (!post) throw new Error('Post não encontrado');

    return post;
  }

  async findAllPublishedPublic(): Promise<PostModel[]> {
    simulateAwait('findAllPublishedPublic');

    const posts = await this.readFromDisk();

    return posts.filter(post => post.published === true);
  }

  async findById(id: string): Promise<PostModel> {
    simulateAwait('findById');

    const posts = await this.findAllPublishedPublic();
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error('Post não encontrado');

    return post;
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
