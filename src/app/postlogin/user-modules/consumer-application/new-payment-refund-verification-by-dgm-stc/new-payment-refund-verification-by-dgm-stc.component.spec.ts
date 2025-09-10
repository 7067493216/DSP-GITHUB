import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentRefundVerificationByDgmStcComponent } from './new-payment-refund-verification-by-dgm-stc.component';

describe('NewPaymentRefundVerificationByDgmStcComponent', () => {
  let component: NewPaymentRefundVerificationByDgmStcComponent;
  let fixture: ComponentFixture<NewPaymentRefundVerificationByDgmStcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPaymentRefundVerificationByDgmStcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentRefundVerificationByDgmStcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
