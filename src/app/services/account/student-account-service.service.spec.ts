import { TestBed } from '@angular/core/testing';

import { StudentAccountServiceService } from './student-account-service.service';

describe('StudentAccountServiceService', () => {
  let service: StudentAccountServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAccountServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
