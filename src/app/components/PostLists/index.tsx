import { postRepository } from '@/repositories/post/json-post-repository';

export async function PostsList() {
  const posts = await postRepository.findAll();

  return (
    <div>
      {posts.map(posts => {
        return <p key={posts.id}>{posts.title}</p>;
      })}
    </div>
  );
}
