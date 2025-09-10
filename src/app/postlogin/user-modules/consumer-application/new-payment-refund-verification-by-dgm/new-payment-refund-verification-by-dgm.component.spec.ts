import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentRefundVerificationByDgmComponent } from './new-payment-refund-verification-by-dgm.component';

describe('NewPaymentRefundVerificationByDgmComponent', () => {
  let component: NewPaymentRefundVerificationByDgmComponent;
  let fixture: ComponentFixture<NewPaymentRefundVerificationByDgmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPaymentRefundVerificationByDgmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentRefundVerificationByDgmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
