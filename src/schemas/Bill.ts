import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  issuer: string;

  @Column()
  expiration_date: Date;

  @Column()
  amonut: number;
}

export default Bill;
