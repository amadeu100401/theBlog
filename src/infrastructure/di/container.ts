import { postModule } from './Post';
import { userModule } from './User';

export const container = {
  //Modulo de posts
  postRepository: postModule.postRepository,
  createPostUseCase: postModule.CreatePostUseCase,
  updatePostUseCase: postModule.updatePostUseCase,
  deletePostUseCase: postModule.deletePostUseCase,

  //Module de usuarios
  userRepository: userModule.userRepository,
  registerUserUseCase: userModule.createUserUseCase,
} as const;

export type Container = typeof container;
