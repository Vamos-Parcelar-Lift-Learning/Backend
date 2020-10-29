import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import Bill from './Bill';

@Entity()
class Locator {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column()
  code: string;

  @Column()
  bills: Bill[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Locator;
