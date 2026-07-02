import { drizzleDb } from '@/infrastructure/db/drizzle';
import { UserTable } from '@/infrastructure/db/drizzle/schemas';
import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { UserModel } from '@/domain/entities/user/user.model';
import { logColor } from '@/shared/util/log-color';
import { UserMapper } from '@/infrastructure/db/mappers/user.mapper';

export class DrizzleUserRepository implements UserRepository {
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
      console.dir(error);
      logColor('====================================');

      if (error instanceof Error) {
        throw new Error(`Erro no banco: ${error.message}`);
      }

      throw new Error('Erro desconhecido ao criar usuário na base de dados');
    }
  }
}
