import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FeePaymentServiceService } from '../../services/feePayment/fee-payment-service.service';
import { FeePaymentRequest } from '../../models/feepayment/fee-payment-request';
import { FeePaymentResponse } from '../../models/feepayment/fee-payment-response';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification/notification.component';

@Component({
  selector: 'app-fee-payment',
  imports: [ReactiveFormsModule, CommonModule, NotificationComponent],
  templateUrl: './fee-payment.component.html',
  styleUrl: './fee-payment.component.scss',
})
export class FeePaymentComponent implements OnInit {
  private fb = inject(FormBuilder);
  paymentForm!: FormGroup;
  feePaymentResponse: FeePaymentResponse[] = [];
  isLoading: boolean = false;
  feedbackMsg: string = '';
  feedbackType:  "success" | "danger" | "info" | "warning" = 'success';
  constructor(private feePaymentServiceService: FeePaymentServiceService) {}
  ngOnInit(): void {
    this.buildFormFields();
  }
  buildFormFields() {
    this.paymentForm = this.fb.group({
      paymentAmount: ['', [Validators.required, Validators.min(1)]],
      studentNumber: [
        '',
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ],
    });
  }
  onSubmit() {
    this.isLoading = true;
    const payload: FeePaymentRequest = { ...this.paymentForm.value };

    if (this.paymentForm.valid) {
      this.feePaymentServiceService
        .makeStudentPayment(payload)
        .subscribe({
          next: (response) => {
            this.feedbackType = 'success';
            this.feedbackMsg = 'Payment completed successfully';
            this.feePaymentResponse.push(response);
          },
          error: (err) => {
            this.feedbackType = 'danger';
            this.feedbackMsg = 'Payment failed';
          },
          complete: () => {
            this.isLoading = false;
          },
        })
        .unsubscribe();
    }
  }
}
