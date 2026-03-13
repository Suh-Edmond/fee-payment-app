import { TestBed } from '@angular/core/testing';
import { InstitutionFeeServiceService } from './institution-fee-service.service';



describe('InstitutionFeeServiceService', () => {
  let service: InstitutionFeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionFeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
