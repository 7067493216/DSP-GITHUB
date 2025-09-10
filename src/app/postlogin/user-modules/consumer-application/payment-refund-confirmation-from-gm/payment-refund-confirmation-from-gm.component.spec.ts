import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRefundConfirmationFromGmComponent } from './payment-refund-confirmation-from-gm.component';

describe('PaymentRefundConfirmationFromGmComponent', () => {
  let component: PaymentRefundConfirmationFromGmComponent;
  let fixture: ComponentFixture<PaymentRefundConfirmationFromGmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentRefundConfirmationFromGmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRefundConfirmationFromGmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
