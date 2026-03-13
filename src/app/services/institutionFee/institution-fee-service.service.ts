import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstitutionFeeDto } from '../../models/instifutionfee/institution-fee-dto';

@Injectable({
  providedIn: 'root'
})
export class InstitutionFeeServiceService {

private httpClient = inject(HttpClient);

  getInstitutionFeeCategories():Observable<InstitutionFeeDto[]>{
    return this.httpClient.get<InstitutionFeeDto[]>("/public/institution-fees")
  }
}
