import { EntitySchema } from "typeorm";

export const Author = new EntitySchema({
  name: "Author",
  tableName: "authors",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
  relations: {
    posts: {
      target: "Post",
      type: "one-to-many",
      inverseSide: "author",
    },
  },
});
