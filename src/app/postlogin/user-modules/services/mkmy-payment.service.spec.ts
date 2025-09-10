import { TestBed } from '@angular/core/testing';

import { MkmyPaymentService } from './mkmy-payment.service';

describe('MkmyPaymentService', () => {
  let service: MkmyPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MkmyPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
