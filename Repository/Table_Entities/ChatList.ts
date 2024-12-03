import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Message } from "./Messages";
import { File } from "./Files";

@Entity()
export class ChatList extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", unique: true, nullable: true })
  conversationId: number | null; 

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text", nullable: true })
  lastMessage: string | null;

  @Column({ type: "varchar", nullable: true })
  lastChange: string | null;

  @Column({ type: "varchar", nullable: true })
  profileImagePath: string | null;

  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Message[];

  @OneToMany(() => File, (file) => file.chat, { cascade: true })
  files: File[];
}
