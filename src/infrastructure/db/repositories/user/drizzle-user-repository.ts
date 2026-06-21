import { drizzleDb } from '@/infrastructure/db/drizzle';
import { UserTable } from '@/infrastructure/db/drizzle/schemas';
import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { UserModel } from '@/domain/entities/user/user.entity';
import { UserMapper } from '../../mappers/user.mapper';
import { logColor } from '@/util/log-color';

export class DrizzleUserRepository implements UserRepository {
  findUserById(id: string): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }

  async insertNewUser(entity: UserModel): Promise<UserModel> {
    try {
      const toPersisty = UserMapper.toPersistence(entity);
      const [user] = await drizzleDb
        .insert(UserTable)
        .values(toPersisty)
        .returning();

      return UserMapper.toDomain(user);
    } catch (error) {
      console.log('=== DETALHES DO ERRO DO POSTGRES ===');
      console.dir(error);
      console.log('====================================');

      if (error instanceof Error) {
        throw new Error(`Erro no banco: ${error.message}`);
      }

      throw new Error('Erro desconhecido ao criar usuário na base de dados');
    }
  }
}
