import type { Category } from "./Category";
import type { Person } from "./Person";

export type TransactionType = 1 | 2; // Expense = 1, Income = 2

export interface Transaction {
  id: string;
  description: string;
  value: number;
  type: TransactionType;
  category: Category;
  person: Person;
}

export interface CreateTransactionInput {
  description: string;
  value: number;
  type: TransactionType;
  categoryId: string;
  personId: string;
}
