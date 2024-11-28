import "reflect-metadata";
import { DataSource } from "typeorm";
import SQLite from "react-native-sqlite-storage";
import { Author } from "./entities/Author";
import { Post } from "./entities/Post";
import { Details } from "./entities/details";
import { Customer } from "./entities/Cutsomer";

SQLite.enablePromise(true);

const database = SQLite.openDatabase(
  {
    name: "ap121212p.db",
    location: "default",
  },
  
  () => {
    
  },
  (error) => {
    console.error("Error opening SQLite database:", error);
  }
);

export const AppDataSource1 = new DataSource({
  type: "react-native",
  database: "app1.db",
  // driver: {
  //   open: () => database, // Pass the manually created SQLite instance
  // },
  entities: [Details,Customer],
  synchronize: true,
  logging: true,
});
