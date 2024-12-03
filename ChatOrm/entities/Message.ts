import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { Chat } from "./Chat";
import { File } from "./File";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  messageId: number; // Primary key, renamed to `messageId`

  @Column({ type: "int" })
  conversationId: number; // Reference to the chat conversation

  @Column({ type: "int" })
  senderId: number; // ID of the sender

  @Column({ type: "boolean", default: false })
  contactMapped: boolean; // Indicates if contact is mapped

  @Column({ type: "int", nullable: true })
  fileId: number | null; // Optional file ID

  @Column({ type: "int", nullable: true })
  fileType: number | null; // Optional file type

  @Column({ type: "varchar", nullable: true })
  fileExt: string | null; // Optional file extension

  @Column({ type: "varchar", nullable: true })
  fileName: string | null; // Optional file name

  @Column({ type: "varchar" })
  messageTime: string; // Message timestamp as a string

  @Column({ type: "text" })
  text: string; // Message content

  @Column({ type: "boolean", default: false })
  seen: boolean; // Indicates if the message has been seen

  @Column({ type: "varchar" })
  senderName: string; // Name of the sender

  @Column({ type: "boolean", default: false })
  selfSended: boolean; // Indicates if the message is self-sent

  @Column({ type: "varchar", nullable: true })
  path: string | null; // Optional file path

  @Column({ type: "varchar", nullable: true })
  status: string | null; // Optional message status

  @Column({ type: "varchar", default: "null" })
  sending: string; // Status of message sending, defaulting to "null"

  @Column({ type: "varchar", nullable: true })
  isLocal: string | null; // Indicates if the message is local

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat; // Relationship to Chat

  @OneToMany(() => File, (file) => file.message)
  files: File[]; // Relationship to Files
}
