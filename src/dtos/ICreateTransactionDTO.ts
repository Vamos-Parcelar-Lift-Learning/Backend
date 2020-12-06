/* eslint-disable @typescript-eslint/camelcase */
import { Double } from 'mongodb';
import Bill from '../schemas/Bill';

class ICreateTransactionDTO {
  _id: string;

  nickname: string;

  bills: Bill[];

  created_at: Date;

  updated_at: Date;

  total_payment: Double;

  cashback_used: Double;

  cashback_generated: Double;

  constructor() {
    const created = new Date();
    this.cashback_used = new Double(0);
    this.total_payment = new Double(0);
    this.cashback_generated = new Double(0);
    this.created_at = created;
    this.updated_at = created;
  }
}

export default ICreateTransactionDTO;
