import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRefundRequestByDGMComponent } from './payment-refund-request-by-dgm.component';

describe('PaymentRefundRequestByDGMComponent', () => {
  let component: PaymentRefundRequestByDGMComponent;
  let fixture: ComponentFixture<PaymentRefundRequestByDGMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentRefundRequestByDGMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRefundRequestByDGMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
