import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: +configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'famboard_user'),
  password: configService.get<string>('DB_PASSWORD', ''),
  database: configService.get<string>('DB_NAME', 'famboard'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: true,
  logging: true,
});
