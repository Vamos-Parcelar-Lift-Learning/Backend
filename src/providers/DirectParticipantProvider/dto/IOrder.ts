interface IBuyer {
  cpf: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

interface IItems {
  item_title: string;
  quantity: number;
  unit_price: number;
}

export default interface IOrder {
  buyer: IBuyer;
  callback_url: string;
  items: IItems[];
  order_ref: string;
  total: number;
  wallet: string;
}
