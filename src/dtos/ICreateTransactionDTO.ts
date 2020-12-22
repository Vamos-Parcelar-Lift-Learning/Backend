import Bill from '../schemas/Bill';

class ICreateTransactionDTO {
  _id: string;

  nickname: string;

  bills: Bill[];

  created_at: Date;

  updated_at: Date;

  total_payment: number;

  cashback_used: number;

  cashback_generated: number;

  constructor() {
    this.cashback_used = 0;
    this.total_payment = 0;
    this.cashback_generated = 0;
  }
}

export default ICreateTransactionDTO;
