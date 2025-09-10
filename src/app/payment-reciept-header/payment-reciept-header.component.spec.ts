import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRecieptHeaderComponent } from './payment-reciept-header.component';

describe('PaymentRecieptHeaderComponent', () => {
  let component: PaymentRecieptHeaderComponent;
  let fixture: ComponentFixture<PaymentRecieptHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentRecieptHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRecieptHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
