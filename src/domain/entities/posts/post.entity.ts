import { UpdatePostDTO } from '@/application/DTOs/post/dtos';
import { PostModel } from './post.model';
import { makeSlugFromText } from '@/util/make-slug-from-text';

export class Post implements PostModel {
  constructor(private props: PostModel) {
    this.props = { ...props };
  }

  get id(): string {
    return this.props.id;
  }
  get title(): string {
    return this.props.title;
  }
  get slug(): string {
    return this.props.slug;
  }
  get author(): string {
    return this.props.author;
  }
  get authorId(): string {
    return this.props.authorId;
  }
  get excerpt(): string {
    return this.props.excerpt;
  }
  get content(): string {
    return this.props.content;
  }
  get coverImageUrl(): string {
    return this.props.coverImageUrl;
  }
  get published(): boolean {
    return this.props.published;
  }
  get createdAt(): string {
    return this.props.createdAt;
  }
  get updatedAt(): string {
    return this.props.updatedAt;
  }

  public setAuthorId(id: string): void {
    if (!id.trim()) return;
    this.props.authorId = id;
  }

  public updatePost(data: UpdatePostDTO): void {
    if (this.props.title !== data.title) {
      this.props.title = data.title;
      this.props.slug = makeSlugFromText(data.title);
    }
    this.props.excerpt = data.excerpt;
    this.props.content = data.content;
    this.props.coverImageUrl = data.coverImageUrl;
    this.props.published = data.published;
    this.changeUpdatedAtDate();
  }

  private changeUpdatedAtDate() {
    this.props.updatedAt = new Date().toString();
  }
}
