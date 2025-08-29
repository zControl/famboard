import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

// Get the root directory
const rootDir = join(__dirname, '..', '..');
const srcDir = join(rootDir, 'src');

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  return {
    type: 'postgres' as const,
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: +configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', 'postgres'),
    database: configService.get<string>('DB_NAME', 'famboard'),
    logging: configService.get<boolean>('DB_LOGGING', !isProduction),
    entities: [join(srcDir, '**', '*.entity.{ts,js}')],
    migrations: [join(srcDir, 'database', 'migrations', '*.{ts,js}')],
    synchronize: !isProduction,
    migrationsRun: isProduction,
  };
};

// For direct TypeORM CLI usage
export const typeOrmConfig = (): TypeOrmModuleOptions => {
  const isProduction = false;
  return {
    type: 'postgres' as const,
    host: 'localhost',
    port: +5432,
    username: 'postgres',
    password: 'postgres',
    database: 'famboard',
    logging: true,
    entities: [join(srcDir, '**', '*.entity.{ts,js}')],
    migrations: [join(srcDir, 'database', 'migrations', '*.{ts,js}')],
    synchronize: !isProduction,
    migrationsRun: isProduction,
  };
};
