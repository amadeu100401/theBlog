import slugify from 'slugify';

export class SlugService {
  public makeSlugFromText = (text: string) => {
    const slug = slugify(text, {
      lower: true,
      strict: true,
      trim: true,
    });

    return `${slug}-${this.makeRandomString()}`;
  };

  private makeRandomString() {
    Math.random().toString(36).substring(2, 6);
  }
}
