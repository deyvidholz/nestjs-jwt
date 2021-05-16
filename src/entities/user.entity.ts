import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  static readonly saltRounds = 10;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @BeforeInsert()
  beforeInsert() {
    this.password = bcrypt.hashSync(this.password, User.saltRounds);
  }
}
