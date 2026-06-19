export interface Category {
  id: number;
  name: string;
}

export interface Expense {
  id: number;
  amount: number;
  date: string;
  description: string;
  category: Category;
}

export interface AppSettings {
  id: number;
  currencyCode: string;
}

export interface MonthlyBudget {
  id: number;
  year: number;
  month: number;
  amount: number;
}
