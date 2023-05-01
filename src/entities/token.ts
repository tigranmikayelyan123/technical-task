import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("refresh_tokens")
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 400 })
  value: string;

  @Column()
  user_id: string;
}
