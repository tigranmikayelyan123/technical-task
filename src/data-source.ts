import "reflect-metadata";
import { Token } from "./entities/token";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { File } from "./entities/file.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_CUSTOM_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, File, Token],
  migrations: [],
  subscribers: [],
});
