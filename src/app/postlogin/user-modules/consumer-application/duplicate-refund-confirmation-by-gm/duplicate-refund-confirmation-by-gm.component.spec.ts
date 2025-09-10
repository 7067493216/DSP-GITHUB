import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateRefundConfirmationByGmComponent } from './duplicate-refund-confirmation-by-gm.component';

describe('DuplicateRefundConfirmationByGmComponent', () => {
  let component: DuplicateRefundConfirmationByGmComponent;
  let fixture: ComponentFixture<DuplicateRefundConfirmationByGmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateRefundConfirmationByGmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateRefundConfirmationByGmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
