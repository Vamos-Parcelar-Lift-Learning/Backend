import { Column, Index } from 'typeorm';

class Bill {
  @Column()
  @Index({ unique: true })
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
  amount: number;
}

export default Bill;
