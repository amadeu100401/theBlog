import { drizzleDb } from '@/infrastructure/db/drizzle';
import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { UserModel } from '@/domain/entities/user/user.model';
import { logColor, logColorDir } from '@/shared/util/log-color';
import { UserMapper } from '@/infrastructure/db/mappers/user.mapper';
import { UserTable } from '@/infrastructure/db/drizzle/schemas/user';
import { and, eq } from 'drizzle-orm';

export class DrizzleUserRepository implements UserRepository {
  async updatePassword(id: string, newPasswordHash: string): Promise<boolean> {
    try {
      const result = await drizzleDb
        .update(UserTable)
        .set({
          passwordHash: newPasswordHash,
          updatedAt: new Date(),
        })
        .where(eq(UserTable.id, id))
        .returning({ id: UserTable.id });

      return result.length > 0;
    } catch (error) {
      logColor('=== DETALHES DO ERRO DO POSTGRES ===');
      logColorDir(JSON.stringify(error));
      logColor('====================================');
      if (error instanceof Error) {
        throw new Error(`Erro no banco: ${error.message}`);
      }
      throw new Error(
        'Erro desconhecido ao atualizar a senha do usuário na base de dados',
      );
    }
  }

  async findUserByEmail(email: string): Promise<UserModel | null> {
    try {
      const user = await drizzleDb.query.users.findFirst({
        where: (user, { eq }) => and(eq(user.email, email)),
      });

      if (!user || user === undefined) {
        return null;
      }

      return UserMapper.toDomain(user);
    } catch (error) {
      logColor('=== DETALHES DO ERRO DO POSTGRES ===');
      logColorDir(JSON.stringify(error));
      logColor('====================================');

      if (error instanceof Error) {
        throw new Error(`Erro no banco: ${error.message}`);
      }

      throw new Error('Erro desconhecido ao buscar usuário na base de dados');
    }
  }

  findUserById(id: string): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }

  async insertNewUser(userModel: UserModel): Promise<UserModel> {
    try {
      const toPersisty = UserMapper.toPersistence(userModel);
      const [user] = await drizzleDb
        .insert(UserTable)
        .values(toPersisty)
        .returning();

      return UserMapper.toDomain(user);
    } catch (error) {
      logColor('=== DETALHES DO ERRO DO POSTGRES ===');
      logColorDir(JSON.stringify(error));
      logColor('====================================');

      if (error instanceof Error) {
        throw new Error(`Erro no banco: ${error.message}`);
      }

      throw new Error('Erro desconhecido ao criar usuário na base de dados');
    }
  }
}
