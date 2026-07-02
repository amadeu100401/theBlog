import { Email } from '@/domain/value-objects/Email.value-object';
import { UserModel, UserRole } from './user.model';
import { ImageUrl } from '@/domain/value-objects/Image-url.value-objects';
import { Password } from '@/domain/value-objects/Password-hash.value-object';

export class User implements UserModel {
  constructor(private props: UserModel) {
    this.props = { ...props };
  }

  get id(): string {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get username(): string {
    return this.props.username;
  }
  get email(): Email {
    return this.props.email;
  }
  get passwordHash(): Password {
    return this.props.passwordHash;
  }
  get role(): UserRole {
    return this.props.role;
  }
  get isActive(): boolean {
    return this.props.isActive;
  }
  get bio(): string | null {
    return this.props.bio;
  }
  get avatarUrl(): ImageUrl | null {
    return this.props.avatarUrl;
  }
  get emailVerifiedAt(): Date | null {
    return this.props.emailVerifiedAt;
  }
  get resetPasswordToken(): string | null {
    return this.props.resetPasswordToken;
  }
  get resetPasswordExpiresAt(): Date | null {
    return this.props.resetPasswordExpiresAt;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public isAdmin(): boolean {
    return this.role === 'admin';
  }

  public canCreatePost() {
    return this.role === 'author' || this.role === 'admin';
  }

  public changeRole(newRole: UserRole): void {
    this.props.role = newRole;
    this.props.updatedAt = this.getNow();
  }

  public updateProfile(data: {
    newName: string;
    newBio?: string | null;
    avatarUrl?: ImageUrl | null;
  }) {
    if (!data.newName.trim()) {
      throw new Error('O nome do perfil não pode ficar vazio');
    }
    this.props.name = data.newName;
    if (data.newBio !== undefined) this.props.bio = data.newBio;
    if (data.avatarUrl && data.avatarUrl !== undefined)
      this.props.avatarUrl = data.avatarUrl;
    this.props.updatedAt = this.getNow();
  }

  public changePassword(newHash: Password) {
    if (newHash === null || newHash === undefined) {
      throw new Error('Erro ao atualizar a senha do usuário');
    }

    this.props.passwordHash = newHash;
  }

  public deactivateUser(): void {
    this.props.isActive = false;
    this.props.updatedAt = this.getNow();
  }

  public reactivateUser(): void {
    this.props.isActive = true;
    this.props.updatedAt = this.getNow();
  }

  public confirmEmail(): void {
    this.props.emailVerifiedAt = this.getNow();
    this.props.updatedAt = this.getNow();
  }

  public generateResetToken() {
    throw new Error('Função ainda não desenvolvida');
  }

  private getNow(): Date {
    return new Date();
  }
}
