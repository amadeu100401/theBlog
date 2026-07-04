import { Post } from './post.entity';
import { PostModel } from './post.model';
import { v4 as uuid } from 'uuid';
import { SlugService } from '@/domain/services/post/SlugService';

interface CreatePostProps {
  title: string;
  author: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
}

export class PostFactory {
  constructor(private readonly slugServices: SlugService) {}

  public create(props: CreatePostProps): Post {
    const now = new Date().toString();
    const newSlug = this.slugServices.makeSlugFromText(props.title);

    const rawPost: PostModel = {
      id: uuid(),
      slug: newSlug,
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
