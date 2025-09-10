import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentRefundVerificationByGmComponent } from './new-payment-refund-verification-by-gm.component';

describe('NewPaymentRefundVerificationByGmComponent', () => {
  let component: NewPaymentRefundVerificationByGmComponent;
  let fixture: ComponentFixture<NewPaymentRefundVerificationByGmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPaymentRefundVerificationByGmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentRefundVerificationByGmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
