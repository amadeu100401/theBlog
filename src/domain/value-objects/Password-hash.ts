import { compareSync, hashSync } from 'bcrypt-ts';

export class Password {
  private readonly value: string;

  private constructor(hash: string) {
    this.value = hash;
  }

  /**
   * Fábrica 1: Cria um Value Object a partir de uma senha PURE (Texto limpo)
   * Usado no cadastro, alteração de senha, etc.
   */
  public static createFromPlainText(text: string): Password {
    if (text.length < 8) {
      throw new Error('A senha deve ter ao menos 8 cractéries');
    }

    const saltRounds = 12;
    const hashedPassword = hashSync(text, saltRounds);

    return new Password(hashedPassword);
  }

  /**
   * Fábrica 2: Reconstitui o Value Object a partir de um Hash que já veio do banco
   * Usado nos Repositórios (Infraestrutura) ao buscar o usuário
   */
  public static createFromHash(hash: string): Password {
    return new Password(hash);
  }

  public compare(text: string): boolean {
    return compareSync(text, this.value);
  }

  public getHash(): string {
    return this.value;
  }
}
