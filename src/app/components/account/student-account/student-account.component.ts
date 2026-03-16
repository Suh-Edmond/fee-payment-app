import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  InstitutionFeeCategory,
  InstitutionFeeDto,
} from '../../../models/instifutionfee/institution-fee-dto';
import { StudentAccountServiceService } from '../../../services/account/student-account-service.service';
import { InstitutionFeeServiceService } from '../../../services/institutionFee/institution-fee-service.service';
import { StudentAccountRequest } from '../../../models/account/student-account-request';

import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../../notification/notification/notification.component';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../constants/app-routes';

@Component({
  selector: 'app-student-account',
  imports: [ReactiveFormsModule, CommonModule, NotificationComponent],
  templateUrl: './student-account.component.html',
  styleUrl: './student-account.component.scss',
})
export class StudentAccountComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  studentForm!: FormGroup;
  institutionFeeCategories: InstitutionFeeDto[] = [];
  isLoading: boolean = false;
    isFetching: boolean = false;
  feedbackMsg: string = '';
  feedbackType: 'success' | 'danger' | 'info' | 'warning' = 'success';
  private subscriptions = new Subscription();
  constructor(
    private institutionFeeService: InstitutionFeeServiceService,
    private studAccService: StudentAccountServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getInstitutionFeeCategories();
    this.buildFormFields();
  }

  buildFormFields() {
    this.studentForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      institutionFeeId: ['', [Validators.required]],
    });
  }
  getInstitutionFeeCategories() {
    this.isFetching = true;
    const sub = this.institutionFeeService
      .getInstitutionFeeCategories()
      .subscribe({
        next: (res) => {
          this.institutionFeeCategories = res;
        },
        error: (err) => {
          this.feedbackType = 'danger';
          this.feedbackMsg = 'An Error occurred could not fetch fee categories';
        },
        complete: () => {
          this.isFetching = false
        },
      });
    this.subscriptions.add(sub);
  }

  onSubmit() {
    const payload: StudentAccountRequest = { ...this.studentForm.value };
    this.isLoading = true;
    if (this.studentForm.valid) {
      const sub = this.studAccService.createStudentAccount(payload).subscribe({
        next: (response) => {
          localStorage.setItem('data', JSON.stringify(response));
          this.feedbackType = 'success';
          this.feedbackMsg = 'Account created successfully';
        },
        error: (err) => {
          this.feedbackType = 'danger';
          this.feedbackMsg = err.error.detail;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate([AppRoutes.FEE_PAYMENT_ROUTE]);
        },
      });
      this.subscriptions.add(sub);
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
