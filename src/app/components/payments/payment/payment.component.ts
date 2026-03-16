import { Component, Input } from '@angular/core';
import { FeePaymentResponse } from '../../../models/feepayment/fee-payment-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  @Input() feePayments: FeePaymentResponse[] = [];
}
