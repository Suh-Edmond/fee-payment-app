import { InstitutionFeeDto } from '../instifutionfee/institution-fee-dto';

export class StudentAccountResponse {
  created: string | undefined;
  updated: string | undefined;
  id: string | undefined;
  studentName: string | undefined;
  studentNumber: string | undefined;
  institutionFeeDto: InstitutionFeeDto | undefined;
}
