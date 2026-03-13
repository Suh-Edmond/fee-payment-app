export class FeePaymentResponse {
  id: string = '';
  previousBalance: number | undefined;
  newBalance: number | undefined;
  nextDueDate: Date | undefined;
  paymentAmount: number | undefined;
  incentiveRate: undefined | undefined;
  incentiveAmount: number | undefined;
  studentNumber: string | undefined;
}
