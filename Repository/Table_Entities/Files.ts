import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { ChatList } from "./ChatList";
import { Message } from "./Messages";

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"varchar"})
  url: string;

  @ManyToOne(() => ChatList, (chat) => chat.files, { nullable: true })
  chat: ChatList;

  @ManyToOne(() => Message, (message) => message.files, { nullable: true })
  message: Message;
}
