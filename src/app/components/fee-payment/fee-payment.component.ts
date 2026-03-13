import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeePaymentServiceService } from '../../services/feePayment/fee-payment-service.service';
import { FeePaymentRequest } from '../../models/feepayment/fee-payment-request';
import { FeePaymentResponse } from '../../models/feepayment/fee-payment-response';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common-service.service';

@Component({
  selector: 'app-fee-payment',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './fee-payment.component.html',
  styleUrl: './fee-payment.component.scss',
})
export class FeePaymentComponent implements OnInit {
  private fb = inject(FormBuilder);
  paymentForm!: FormGroup;
  feePaymentResponse: FeePaymentResponse[] = [];
  isLoading: boolean = false;
  constructor(private feePaymentServiceService: FeePaymentServiceService, private commonService:CommonService) {}
  ngOnInit(): void {
    this.commonService.setRequestFeedbackMsg("")
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
            this.feePaymentResponse.push(response);
          },
          error: (err) => {},
          complete: () => {
            this.isLoading = false;
          },
        })
        .unsubscribe();
    }
  }
}
