import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Chat } from "./Chat";
import { Message } from "./Message";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Chat, (chat) => chat.files, { nullable: true })
  chat: Chat;

  @ManyToOne(() => Message, (message) => message.files, { nullable: true })
  message: Message;
}
