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
    host: 'localhost',
    port: 5432,
    username: 'famboard_user',
    password: 'famboard_password',
    database: 'famboard',
    logging: true,
    entities: [join(srcDir, '**', '*.entity.{ts,js}')],
    migrations: [join(srcDir, 'database', 'migrations', '*.{ts,js}')],
    synchronize: !isProduction,
    migrationsRun: isProduction,
    autoLoadEntities: true,
  };
};
