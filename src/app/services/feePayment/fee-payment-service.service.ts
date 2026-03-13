import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FeePaymentRequest } from '../../models/feepayment/fee-payment-request';
import { Observable } from 'rxjs';
import { FeePaymentResponse } from '../../models/feepayment/fee-payment-response';

@Injectable({
  providedIn: 'root'
})
export class FeePaymentServiceService {

  private httpClient = inject(HttpClient);

  makeStudentPayment(request: FeePaymentRequest):Observable<FeePaymentResponse>{
    return this.httpClient.post<FeePaymentResponse>("/one-time-fee-payment", request)
  }
}
