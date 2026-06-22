import { makeSlugFromText } from '@/util/make-slug-from-text';
import { Post } from './post.entity';
import { PostModel } from './post.model';
import { v4 as uuid } from 'uuid';

interface CreatePostProps {
  title: string;
  author: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
}

export class PostFactory {
  static create(props: CreatePostProps): Post {
    const now = new Date().toString();

    const rawPost: PostModel = {
      id: uuid(),
      slug: makeSlugFromText(props.title),
      excerpt: props.excerpt,
      author: props.author,
      authorId: '',
      title: props.title,
      coverImageUrl: props.coverImageUrl,
      content: props.content,
      published: props.published,
      createdAt: now,
      updatedAt: now,
    };

    return new Post(rawPost);
  }
}
