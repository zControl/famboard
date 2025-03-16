import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config(); // Load environment variables from .env file

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: +configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'famboard_user'),
  password: configService.get<string>('DB_PASSWORD', ''),
  database: configService.get<string>('DB_NAME', 'famboard'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
