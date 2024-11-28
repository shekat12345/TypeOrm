import { EntitySchema } from "typeorm";

export const Post = new EntitySchema({
  name: "Post",
  tableName: "posts",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    content: {
      type: "text",
    },
  },
  relations: {
    author: {
      target: "Author",
      type: "many-to-one",
      joinColumn: true,
    },
  },
});
