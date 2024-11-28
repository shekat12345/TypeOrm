
import 'reflect-metadata'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
const { EntitySchema } = require("typeorm");
@Entity()
export class User111 {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "string" })
    firstName: string
    // type:"varchar"

    // @Column()
    // lastName: string

    // @Column()
    // isActive: boolean
}
@Entity("authors") // Specifies the table name
export class Author {
  @PrimaryGeneratedColumn()
  id: number; // Auto-increment primary key

  @Column({ type: "varchar" })
  name: string; // Name column

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[]; // One-to-many relationship with Post
}

module.exports = { Author };
