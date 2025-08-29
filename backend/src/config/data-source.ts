import { join } from 'path';
import { DataSource } from 'typeorm';

const rootDir = join(__dirname, '..', '..');
const srcDir = join(rootDir, 'src');

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'famboard',
  logging: process.env.DB_LOGGING === 'true',
  entities: [join(srcDir, '**', '*.entity.{ts,js}')],
  migrations: [join(srcDir, 'database', 'migrations', '*.{ts,js}')],
  synchronize: process.env.NODE_ENV !== 'production',
  migrationsRun: process.env.NODE_ENV === 'production',
});
