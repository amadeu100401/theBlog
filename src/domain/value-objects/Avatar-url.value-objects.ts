export class AvatarUrl {
  private readonly value: string;

  constructor(url: string) {
    if (!this.validate(url)) {
      throw new Error('A url deve ser válida');
    }

    this.value = url;
  }

  private validate(url: string): boolean {
    const isRelativePathRegex =
      /^\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*(?:\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*)*$/;

    return isRelativePathRegex.test(url);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: AvatarUrl): boolean {
    return this.value === other.getValue();
  }
}
