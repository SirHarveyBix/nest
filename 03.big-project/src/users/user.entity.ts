import { Exclude } from 'class-transformer';
import { ReportEntity } from '../reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
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

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[];

  @AfterInsert()
  logInsert() {
    console.info('Inserted User id: ', this.id);
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
