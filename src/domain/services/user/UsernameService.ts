export class UsernameService {
  public generate(fullName: string): string {
    if (!fullName || fullName.trim().length === 0) {
      throw new Error(
        'Não é possível gerar um usename a partir de um nome vazio',
      );
    }

    let username = fullName.toLowerCase().trim();

    const connectors = /\b(de|da|do|dos|das)\b/g;
    username = username.replace(connectors, '');

    username = username.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    username = username.replace(/\s+/g, '.');

    username = username.replace(/[^a-z.]/g, '');

    username = username.replace(/\.+/g, '.').replace(/(^\.|\.$)/g, '');

    return `${username}-${new Date().toISOString()}`;
  }
}
