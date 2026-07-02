export class AvatarUrl {
  private readonly value: string;

  private constructor(url: string) {
    this.value = url;
  }

  public static createLocal(url: string): AvatarUrl {
    const isRelativePathRegex =
      /^\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*(?:\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*)*$/;
    if (!isRelativePathRegex.test(url)) {
      throw new Error('A url deve ser válida');
    }

    return new AvatarUrl(url);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: AvatarUrl): boolean {
    return this.value === other.getValue();
  }
}
