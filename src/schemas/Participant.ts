import { Column } from 'typeorm';

export default class Participant {
  @Column()
  order_id: string;

  @Column()
  qr_code: string;

  @Column()
  qr_code_text: string;

  @Column()
  status: string;
}
