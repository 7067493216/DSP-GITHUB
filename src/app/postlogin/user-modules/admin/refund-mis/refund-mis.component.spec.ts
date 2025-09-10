import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundMisComponent } from './refund-mis.component';

describe('RefundMisComponent', () => {
  let component: RefundMisComponent;
  let fixture: ComponentFixture<RefundMisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundMisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundMisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
