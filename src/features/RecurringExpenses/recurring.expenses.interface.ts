export interface RecurringExpensesInterface {
  user_id: string;
  autopay: boolean;
  description: string;
  status: string;
  expenseName: string;
  paymentMethod: string;
  expenseAmount: string;
  recurrenceInterval: string;
  nextDueDate: Date;
}
