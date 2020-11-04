import { Column } from 'typeorm';

class Bill {
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

  constructor(
    code: string,
    name: string,
    description: string,
    issuer: string,
    amonut: number,
  ) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.issuer = issuer;
    this.amonut = amonut;
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.expiration_date = new Date();
  }
}

export default Bill;
