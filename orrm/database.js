import "reflect-metadata";
import { DataSource } from "typeorm";
import SQLite from "react-native-sqlite-storage";
import { Author } from "./entities/Author";
import { Post } from "./entities/Post";

SQLite.enablePromise(true);

const database = SQLite.openDatabase(
  {
    name: "app.db",
    location: "default",
  },
  () => {
    
  },
  (error) => {
    console.error("Error opening SQLite database:", error);
  }
);

export const AppDataSource = new DataSource({
  type: "react-native",
  database: "app.db",
  // driver: {
  //   open: () => database, // Pass the manually created SQLite instance
  // },
  entities: [Author, Post],
  synchronize: true,
  logging: true,
});
