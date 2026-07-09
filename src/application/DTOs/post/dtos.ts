import { PostModel } from '@/domain/entities/posts/post.model';

export type PublicPost = Omit<PostModel, 'updatedAt' | 'authorId'>;

export const makePartialPublicPost = (
  post?: Partial<PostModel>,
): PublicPost => {
  return {
    id: post?.id || '',
    slug: post?.slug || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    author: post?.author || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    createdAt: post?.createdAt || '',
    published: post?.published || false,
  };
};

export const makePublicPost = (post: PostModel): PublicPost => {
  return makePartialPublicPost(post);
};

export interface CreatePostDTO {
  userEmail: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
}

export interface UpdatePostDTO {
  postId: string;
  title: string;
  slug: string | '';
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
}
