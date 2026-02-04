export interface PersonTotalsDto {
  id: string;
  name: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface GeneralTotalsDto {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface PersonTotalsReportDto {
  persons: PersonTotalsDto[];
  generalTotals: GeneralTotalsDto;
}

export interface CategoryTotalsDto {
  id: string;
  description: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface CategoryTotalsReportDto {
  categories: CategoryTotalsDto[];
  generalTotals: GeneralTotalsDto;
}
