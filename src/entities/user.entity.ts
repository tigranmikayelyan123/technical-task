import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { File } from './file.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
