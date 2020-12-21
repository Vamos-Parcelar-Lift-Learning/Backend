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

  constructor(
    code: string,
    name: string,
    description: string,
    issuer: string,
    amount: number,
  ) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.issuer = issuer;
    this.amount = amount;
    this.expiration_date = new Date();
  }
}

export default Bill;
