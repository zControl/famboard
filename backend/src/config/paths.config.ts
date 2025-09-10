import { join } from 'path';

export const getTypeOrmPaths = (fromDir: string) => ({
  entities: join(fromDir, 'modules', '**', '*.entity.{ts,js}'),
  migrations: join(fromDir, 'database', 'migrations', '*.{ts,js}'),
});
