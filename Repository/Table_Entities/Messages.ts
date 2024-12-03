import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { ChatList } from "./ChatList";
import { File } from "./Files";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  messageId: number;

  @Column({ type: "int" })
  conversationId: number;

  @Column({ type: "int" })
  senderId: number;

  @Column({ type: "boolean", default: false })
  contactMapped: boolean;

  @Column({ type: "int", nullable: true })
  fileId: number | null;

  @Column({ type: "int", nullable: true })
  fileType: number | null;

  @Column({ type: "varchar", nullable: true })
  fileExt: string | null;

  @Column({ type: "varchar", nullable: true })
  fileName: string | null;

  @Column({ type: "varchar" })
  messageTime: string;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "boolean", default: false })
  seen: boolean;

  @Column({ type: "varchar" })
  senderName: string;

  @Column({ type: "boolean", default: false })
  selfSended: boolean;

  @Column({ type: "varchar", nullable: true })
  path: string | null;

  @Column({ type: "varchar", nullable: true })
  status: string | null;

  @Column({ type: "varchar", default: "null" })
  sending: string;

  @Column({ type: "varchar", nullable: true })
  isLocal: string | null;

  @ManyToOne(() => ChatList, (chat) => chat.messages)
  chat: ChatList;

  @OneToMany(() => File, (file) => file.message)
  files: File[];
}
