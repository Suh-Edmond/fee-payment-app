import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { PaymentComponent } from '../payments/payment/payment.component';
import { Subscription } from 'rxjs';
import { StudentAccountResponse } from '../../models/account/student-account-response';

@Component({
  selector: 'app-fee-payment',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NotificationComponent,
    PaymentComponent,
  ],
  templateUrl: './fee-payment.component.html',
  styleUrl: './fee-payment.component.scss',
})
export class FeePaymentComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  paymentForm!: FormGroup;
  feePaymentResponse: FeePaymentResponse[] = [];
  isLoading: boolean = false;
  feedbackMsg: string = '';
  feedbackType: 'success' | 'danger' | 'info' | 'warning' = 'success';
  studentData!: StudentAccountResponse;
  previousPayment!: FeePaymentResponse;

  private subscriptions = new Subscription();

  constructor(private feePaymentServiceService: FeePaymentServiceService) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    const data = localStorage.getItem('data');

    if (data !== null) {
      this.studentData = JSON.parse(data);
    }
    this.getStudentFeePayments(this.studentData.studentNumber);
    this.buildFormFields();
  }
  buildFormFields() {
    this.paymentForm = this.fb.group({
      paymentAmount: [0, [Validators.required, Validators.min(1)]],
      studentNumber: this.studentData.studentNumber,
      studentName: this.studentData.studentName,
      amountPayable: 0,
    });
  }
  getStudentFeePayments(studentNumber: string | undefined) {
    this.isLoading = true;
    const sub = this.feePaymentServiceService
      .getStudentPayments(studentNumber)
      .subscribe({
        next: (res) => {
          this.feePaymentResponse = [...res];
          this.getNewStudentBalance(this.feePaymentResponse);
          this.paymentForm
            .get('amountPayable')
            ?.patchValue(
              this.previousPayment !== undefined
                ? this.previousPayment.newBalance
                : this.studentData.institutionFeeDto?.amountPayable,
            );
        },
        error: (e) => {
          this.isLoading = false;
          this.feedbackType = 'danger';
          this.feedbackMsg = 'Could not fetch student payments';
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    this.subscriptions.add(sub);
  }

  getNewStudentBalance(payments: FeePaymentResponse[]) {
    this.previousPayment = payments.sort(
      (a, b) => Date.parse(b.created) - Date.parse(a.created),
    )[0];
  }

  validPaymentAmount(){
    return this.paymentForm.get('paymentAmount')?.value <= this.paymentForm.get("amountPayable")?.value
  }

  onSubmit() {
    this.isLoading = true;
    const payload: FeePaymentRequest = { ...this.paymentForm.value };
    if (this.paymentForm.valid && this.validPaymentAmount()) {
      const sub = this.feePaymentServiceService
        .makeStudentPayment(payload)
        .subscribe({
          next: (response) => {
            this.feedbackType = 'success';
            this.feedbackMsg = 'Payment completed successfully';
            this.getStudentFeePayments(this.studentData.studentNumber);
          },
          error: (err) => {
            this.isLoading = false;
            this.feedbackType = 'danger';
            this.feedbackMsg = 'Payment failed';
          },
          complete: () => {
            this.isLoading = false;
            this.paymentForm.get('paymentAmount')?.patchValue(0)
          },
        });
      this.subscriptions.add(sub);
    }
  }
}
