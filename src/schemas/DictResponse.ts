import { Column } from 'typeorm';

interface IOwner {
  Name: string;
  TaxIdNumber: number;
  Type: string;
}

interface IAccount {
  AccountNumber: string;
  AccountType: string;
  Branch: string;
  OpeningDate: string;
  Participant: string;
}

export default interface IResponseDict {
  Account: IAccount;
  Owner: IOwner;
  Key: string;
  KeyType: string;
}

class DictResponse {
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
