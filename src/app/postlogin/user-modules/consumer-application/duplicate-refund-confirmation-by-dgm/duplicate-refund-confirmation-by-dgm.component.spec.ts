import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateRefundConfirmationByDgmComponent } from './duplicate-refund-confirmation-by-dgm.component';

describe('DuplicateRefundConfirmationByDgmComponent', () => {
  let component: DuplicateRefundConfirmationByDgmComponent;
  let fixture: ComponentFixture<DuplicateRefundConfirmationByDgmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateRefundConfirmationByDgmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateRefundConfirmationByDgmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
