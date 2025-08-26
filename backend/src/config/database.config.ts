import * as dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables
dotenv.config();

const env = process.env;

// Get the root directory
const rootDir = join(__dirname, '..', '..');
const srcDir = join(rootDir, 'src');

export const databaseConfig = {
  type: 'postgres' as const,
  host: env.DB_HOST || 'localhost',
  port: parseInt(env.DB_PORT || '5432', 10),
  username: env.DB_USERNAME || 'famboard_user',
  password: env.DB_PASSWORD || '',
  database: env.DB_NAME || 'famboard',
  entities: [join(srcDir, '**', '*.entity.{ts,js}')],
  migrations: [join(srcDir, 'database', 'migrations', '*.{ts,js}')],
  synchronize: env.NODE_ENV !== 'production',
  logging: env.DB_LOGGING === 'true' || env.NODE_ENV !== 'production',
  migrationsRun: env.NODE_ENV === 'production',
};
