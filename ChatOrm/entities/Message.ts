import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Chat } from "./Chat";
import { File } from "./File";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @OneToMany(() => File, (file) => file.message)
  files: File[];
}
