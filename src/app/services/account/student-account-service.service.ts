import { inject, Injectable } from '@angular/core';
import { StudentAccountRequest } from '../../models/account/student-account-request';
import { StudentAccountResponse } from '../../models/account/student-account-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentAccountServiceService {

  private httpClient = inject(HttpClient);

  createStudentAccount(request: StudentAccountRequest):Observable<StudentAccountResponse>{
    return this.httpClient.post<StudentAccountResponse>("/student-account-create", request)
  }
}
