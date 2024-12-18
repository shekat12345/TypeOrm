import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Message } from "./Message";
import { File } from "./File";

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", unique: true, nullable: true })
  conversationId: number | null; // Nullable unique identifier for the conversation

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text", nullable: true })
  lastMessage: string | null; // Nullable content of the last message

  @Column({ type: "varchar", nullable: true })
  lastChange: string | null; // Nullable date/time of the last change

  @Column({ type: "varchar", nullable: true })
  profileImagePath: string | null; // Nullable path to the profile image

  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Message[]; // Array of messages

  @OneToMany(() => File, (file) => file.chat, { cascade: true })
  files: File[]; // Array of files
}
