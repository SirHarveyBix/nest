import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.info('Interted User id: ', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.info('Updated User id: ', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.info('Removed User id: ', this.id);
  }
}
