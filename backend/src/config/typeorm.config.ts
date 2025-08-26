import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  // You can still override specific settings if needed
  return {
    ...databaseConfig,
    // Any NestJS-specific overrides can go here
  };
};
