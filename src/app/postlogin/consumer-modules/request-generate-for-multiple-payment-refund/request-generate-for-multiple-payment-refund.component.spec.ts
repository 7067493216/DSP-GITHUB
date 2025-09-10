import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestGenerateForMultiplePaymentRefundComponent } from './request-generate-for-multiple-payment-refund.component';

describe('RequestGenerateForMultiplePaymentRefundComponent', () => {
  let component: RequestGenerateForMultiplePaymentRefundComponent;
  let fixture: ComponentFixture<RequestGenerateForMultiplePaymentRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestGenerateForMultiplePaymentRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestGenerateForMultiplePaymentRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
