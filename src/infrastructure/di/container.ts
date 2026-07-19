import { postModule } from './Post';
import { userModule } from './User';
import { authModule } from './Auth';

export const container = {
  //Modulo de posts
  postRepository: postModule.postRepository,
  createPostUseCase: postModule.CreatePostUseCase,
  updatePostUseCase: postModule.updatePostUseCase,
  deletePostUseCase: postModule.deletePostUseCase,

  //Module de usuarios
  userRepository: userModule.userRepository,
  registerUserUseCase: userModule.createUserUseCase,

  //Auth
  doLoginUseCase: authModule.doLogin,
  getUserByTokenUseCase: authModule.getUserByToken,
  sendForgetPasswordEmailUseCase: authModule.forgetPassword,
} as const;

export type Container = typeof container;
