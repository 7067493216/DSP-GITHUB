import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateRefundConfirmationByFinanceComponent } from './duplicate-refund-confirmation-by-finance.component';

describe('DuplicateRefundConfirmationByFinanceComponent', () => {
  let component: DuplicateRefundConfirmationByFinanceComponent;
  let fixture: ComponentFixture<DuplicateRefundConfirmationByFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateRefundConfirmationByFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateRefundConfirmationByFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
