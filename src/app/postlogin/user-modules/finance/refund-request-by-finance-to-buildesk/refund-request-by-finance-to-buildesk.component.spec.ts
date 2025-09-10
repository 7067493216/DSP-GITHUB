import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundRequestByFinanceToBuildeskComponent } from './refund-request-by-finance-to-buildesk.component';

describe('RefundRequestByFinanceToBuildeskComponent', () => {
  let component: RefundRequestByFinanceToBuildeskComponent;
  let fixture: ComponentFixture<RefundRequestByFinanceToBuildeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundRequestByFinanceToBuildeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundRequestByFinanceToBuildeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
