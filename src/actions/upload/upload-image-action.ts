'use server';
import { logColor } from '@/util/log-color';

//diretiva para criar uma server action -> isso acaba virando um endpoint da minha aplicação

export async function uploadImageAction() {
  // 'use server' -> podpe ser criada a nivel de arquivo

  logColor('Olá da action uploadImageAction');

  return {
    user: 'Senha do usuario',
  };
}
