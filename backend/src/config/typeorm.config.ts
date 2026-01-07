import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { getTypeOrmPaths } from 'src/config/paths.config';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const paths = getTypeOrmPaths(join(__dirname, '..'));

  return {
    type: 'postgres' as const,
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    logging: !isProduction,
    entities: [paths.entities],
    migrations: [paths.migrations],
    synchronize: false,
    migrationsRun: isProduction,
    autoLoadEntities: true,
  };
};
