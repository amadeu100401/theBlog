import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzleDb } from '.';
import { PostsTable, UserTable } from './schemas';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { sql } from 'drizzle-orm';

(async () => {
  const jsonRepository = new JsonPostRepository();
  const posts = await jsonRepository.findAll();

  const formattedPosts = posts.map(post => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
  }));

  const migrationsPath = path.resolve(__dirname, 'migrations');

  try {
    // ==========================================
    // PASSO 0: APAGAR MIGRATIONS LOCAIS ANTIGAS
    // ==========================================
    console.log(
      '💥 0. Apagando arquivos de migrations locais... - ',
      new Date().toISOString(),
    );
    if (fs.existsSync(migrationsPath)) {
      fs.rmSync(migrationsPath, { recursive: true, force: true });
    }
    fs.mkdirSync(migrationsPath, { recursive: true });
    console.log('  ↳ Arquivos antigos deletados e pasta limpa.');

    // ==========================================
    // PASSO 1 DESTRUIÇÃO TOTAL DO BANCO ANTIGO
    // ==========================================
    console.log(
      '🧹 1. Removendo tabelas, históricos e enums antigos do banco... - ',
      new Date().toISOString(),
    );
    await drizzleDb.execute(sql`DROP TABLE IF EXISTS "posts" CASCADE;`);
    await drizzleDb.execute(sql`DROP TABLE IF EXISTS "users" CASCADE;`);

    // Limpa o histórico do Drizzle e os enums customizados
    await drizzleDb.execute(
      sql`DROP TABLE IF EXISTS drizzle.migrations CASCADE;`,
    );
    await drizzleDb.execute(sql`DROP TYPE IF EXISTS "user_role" CASCADE;`);

    console.log(
      '  ↳ Banco de dados limpo com sucesso (Pronto para receber a nova estrutura).',
    );

    // ==========================================
    // PASSO 2: GERAR NOVAS MIGRATIONS (DRIZZLE-KIT)
    // ==========================================
    console.log(
      '⚙️ 2. Gerando novos arquivos de migration baseados no Schema... - ',
      new Date().toISOString(),
    );

    // Pega exatamente a pasta onde você abriu o terminal para rodar o projeto
    const rootPath = process.cwd();

    console.log(`📁 Forçando terminal na raiz do projeto: ${rootPath}`);

    // Executa o generate puro. Estando na raiz correta, o drizzle-kit funciona perfeitamente
    execSync('npx drizzle-kit generate', {
      cwd: rootPath,
      stdio: 'inherit',
    });
    console.log('  ↳ Novas migrations geradas com sucesso!');

    // ==========================================
    // PASSO 3: APLICAR MIGRATIONS NO BANCO
    // ==========================================
    console.log(
      '🚀 3. Executando as novas migrations no banco de dados... - ',
      new Date().toISOString(),
    );
    await migrate(drizzleDb, { migrationsFolder: migrationsPath });
    console.log('  ↳ Banco estruturado com as novas tabelas.');

    // ==========================================
    // PASSO 4: POPULAR SEED DE USUÁRIO E POSTS
    // ==========================================
    console.log(
      '👤 4. Inserindo usuário administrador... - ',
      new Date().toISOString(),
    );
    const [insertedUser] = await drizzleDb
      .insert(UserTable)
      .values({
        name: 'Admin do Lab',
        userName: 'admin',
        email: 'amadeumartim@gmail.com',
        passwordHash: '$2b$10$MockedHashForDevEnvironmentOnly',
        role: 'admin',
        isActive: true,
      })
      .returning({ insertedId: UserTable.id });

    const authorId = insertedUser.insertedId;

    console.log(
      '📝 5. Inserindo novos posts salvos na tabela - ',
      new Date().toISOString(),
    );

    const postWithAuthorId = formattedPosts.map(post => ({
      ...post,
      authorId: authorId,
    }));

    await drizzleDb.insert(PostsTable).values(postWithAuthorId as []);

    console.log(
      '✅ [SUCESSO] Todo o ambiente foi resetado, gerado, migrado e populado! - ',
      new Date().toISOString(),
    );
  } catch (e) {
    console.log('🚨 Erro crítico no processo de automação do banco.');
    console.error(e);
  }
})();
