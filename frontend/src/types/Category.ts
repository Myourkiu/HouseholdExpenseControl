export type CategoryPurpose = 1 | 2 | 3; // Expense = 1, Income = 2, Both = 3

export interface Category {
  id: string;
  description: string;
  purpose: CategoryPurpose;
}

export type CreateCategoryInput = Pick<Category, "description" | "purpose">;