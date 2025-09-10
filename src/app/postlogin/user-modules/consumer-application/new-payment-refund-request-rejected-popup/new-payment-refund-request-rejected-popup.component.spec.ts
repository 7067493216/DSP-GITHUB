import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentRefundRequestRejectedPopupComponent } from './new-payment-refund-request-rejected-popup.component';

describe('NewPaymentRefundRequestRejectedPopupComponent', () => {
  let component: NewPaymentRefundRequestRejectedPopupComponent;
  let fixture: ComponentFixture<NewPaymentRefundRequestRejectedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPaymentRefundRequestRejectedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentRefundRequestRejectedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
