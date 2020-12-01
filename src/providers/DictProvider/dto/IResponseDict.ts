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
