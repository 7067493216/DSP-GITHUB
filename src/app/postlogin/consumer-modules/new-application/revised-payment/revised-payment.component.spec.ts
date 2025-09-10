import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedPaymentComponent } from './revised-payment.component';

describe('RevisedPaymentComponent', () => {
  let component: RevisedPaymentComponent;
  let fixture: ComponentFixture<RevisedPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisedPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
