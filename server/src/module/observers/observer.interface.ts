import { Transaction } from "../transactions/schemas/transaction.schema";
export interface Observer {
  update(transaction: Transaction): void;
}