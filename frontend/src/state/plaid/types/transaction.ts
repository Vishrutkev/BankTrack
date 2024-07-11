export interface Transaction {
  account_id: string;
  account_owner: string | null;
  amount: number;
  authorized_date: string | null;
  category: string[];
  date: string;
  iso_currency_code: string;
  name: string;
  pending: boolean;
  transaction_id: string;
  transaction_type: string;
}

export interface TransactionsData {
  latest_transactions: Transaction[];
}
