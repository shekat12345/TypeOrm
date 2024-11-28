import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";

const { EntitySchema } = require("typeorm");

@Entity("posts") // Specifies the table name
export class Post {
  @PrimaryGeneratedColumn()
  id: number; // Auto-increment primary key

  @Column({ type: "varchar" })
  title: string; // Title column

  @Column({ type: "text" })
  content: string; // Content column  
  @ManyToOne(() => Author, (author) => author.posts, { onDelete: "CASCADE",cascade:true })
  author: Author; // Many-to-one relationship with Author  
}

module.exports = { Post };
