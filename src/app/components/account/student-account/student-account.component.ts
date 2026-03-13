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

@Component({
  selector: 'app-student-account',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-account.component.html',
  styleUrl: './student-account.component.scss',
})
export class StudentAccountComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  studentForm!: FormGroup;
  institutionFeeCategories: InstitutionFeeDto[] = [
    {
      created: '2026-03-13T09:59:07',
      updated: '2026-03-13T09:59:07',
      id: 'e4735dd0-1eba-11f1-95e8-da537127e399',
      name: 'Fresh Men',
      amountPayable: 800000,
      category: InstitutionFeeCategory.FRESH_MEN,
    },
    {
      created: '2026-03-13T09:59:07',
      updated: '2026-03-13T09:59:07',
      id: 'e4741efb-1eba-11f1-95e8-da537127e399',
      name: 'Sophomore',
      amountPayable: 900000,
      category: InstitutionFeeCategory.SOPHOMORE,
    },
    {
      created: '2026-03-13T09:59:07',
      updated: '2026-03-13T09:59:07',
      id: 'e474c057-1eba-11f1-95e8-da537127e399',
      name: 'Senior',
      amountPayable: 1000000,
      category: InstitutionFeeCategory.SENIOR,
    },
  ];
  isLoading: boolean = false;

  constructor(
    private institutionFeeService: InstitutionFeeServiceService,
    private studAccService: StudentAccountServiceService,
  ) {}

  ngOnInit(): void {
    this.getInstitutionFeeCategories();
    this.buildFormFields();
  }

  buildFormFields() {
    this.studentForm = this.fb.group({
      studentName: ['', Validators.required, Validators.minLength(3)],
      studentNumber: [
        '',
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ],
      institutionFeeId: ['', Validators.required],
    });
  }
  getInstitutionFeeCategories() {
    this.isLoading = true;

    this.institutionFeeService
      .getInstitutionFeeCategories()
      .subscribe({
        next: (res) => {
          this.institutionFeeCategories = res;
        },
        error: (err) => {},
        complete: () => {
          this.isLoading = false;
        },
      })
      .unsubscribe();
  }

  onSubmit() {
    const payload: StudentAccountRequest = { ...this.studentForm.value };
    this.isLoading = true;
    if (this.studentForm.valid) {
      this.studAccService
        .createStudentAccount(payload)
        .subscribe({
          next: (response) => {},
          error: (err) => {},
          complete: () => {
            this.isLoading = false;
          },
        })
        .unsubscribe();
    }
  }
  ngOnDestroy(): void {}
}
