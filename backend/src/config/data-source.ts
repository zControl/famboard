import 'dotenv/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { getTypeOrmPaths } from './paths.config';

const paths = getTypeOrmPaths(join(__dirname, '..'));

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.DB_LOGGING === 'true',
  entities: [paths.entities],
  migrations: [paths.migrations],
  synchronize: false,
  migrationsRun: process.env.NODE_ENV === 'production',
});
