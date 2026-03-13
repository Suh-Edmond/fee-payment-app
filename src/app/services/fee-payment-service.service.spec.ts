import { TestBed } from '@angular/core/testing';

import { FeePaymentServiceService } from './fee-payment-service.service';

describe('FeePaymentServiceService', () => {
  let service: FeePaymentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeePaymentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
