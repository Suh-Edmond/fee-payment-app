import { inject, Injectable } from '@angular/core';
import { StudentAccountRequest } from '../../models/account/student-account-request';
import { StudentAccountResponse } from '../../models/account/student-account-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstitutionFeeDto } from '../../models/instifutionfee/institution-fee-dto';

@Injectable({
  providedIn: 'root'
})
export class StudentAccountServiceService {

  private httpClient = inject(HttpClient);

  createStudentAccount(request: StudentAccountRequest):Observable<StudentAccountResponse>{
    return this.httpClient.post<StudentAccountResponse>("/public/student-account/create", request)
  }

  getStudentInstitutionFeeCategory(studentNumber:string):Observable<InstitutionFeeDto>{
    return this.httpClient.get<InstitutionFeeDto>("/public/student-account/institution-fee?studentNumber="+studentNumber)
  }
}
