interface Buyer {
  cpf: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

interface Items {
  item_title: string;
  quantity: number;
  unity_price: number;
}

export default interface Order {
  buyer: Buyer;
  items: Items[];
  order_ref: string;
  total: number;
  wallet: string;
}
