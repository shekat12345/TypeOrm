import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Chat } from "./Chat";
import { Message } from "./Message";

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"varchar"})
  url: string;

  @ManyToOne(() => Chat, (chat) => chat.files, { nullable: true })
  chat: Chat;

  @ManyToOne(() => Message, (message) => message.files, { nullable: true })
  message: Message;
}
