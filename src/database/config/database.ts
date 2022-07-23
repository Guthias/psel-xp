import 'dotenv/config';
import { Options } from 'sequelize';

const environment = process.env.NODE_ENV === 'test' ? '-test' : '';

const config: Options = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE + environment,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: process.env.DB_DIALECT as any,
};

export = config;
