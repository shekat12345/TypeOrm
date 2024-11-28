import "reflect-metadata";
import { DataSource } from "typeorm";
import { Author } from "./Author";
import { Post } from "./Post";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "app.db",
  entities: [Author, Post],
  synchronize: true,
});
