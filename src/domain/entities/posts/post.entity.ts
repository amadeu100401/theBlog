import { UpdatePostDTO } from '@/application/DTOs/post/dtos';
import { PostModel } from './post.model';

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
    if (data.title !== null && data.title.trim().length > 0) {
      this.props.title = data.title;
      this.props.slug = data.slug;
    }
    this.props.excerpt = data.excerpt;
    if (data.content && data.content.trim().length > 0) {
      this.props.content = data.content;
    }
    if (data.coverImageUrl && data.coverImageUrl.trim().length > 0) {
      this.props.coverImageUrl = data.coverImageUrl;
    }
    this.props.published = data.published;
    this.changeUpdatedAtDate();
  }

  private changeUpdatedAtDate() {
    this.props.updatedAt = new Date().toString();
  }
}
