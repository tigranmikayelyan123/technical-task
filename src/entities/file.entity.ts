import {
  Entity,
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  extension: string;

  @Column()
  mime_type: string;

  @Column()
  size: number;

  @CreateDateColumn()
  uploadDate: Date;

  @ManyToOne(() => User, (user) => user.files)
  user: User;
}
