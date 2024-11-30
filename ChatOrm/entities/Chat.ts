import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Message } from "./Message";
import { File } from "./File";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @OneToMany(() => File, (file) => file.chat)
  files: File[];
}
