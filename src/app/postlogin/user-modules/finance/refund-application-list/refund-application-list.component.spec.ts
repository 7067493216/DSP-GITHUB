import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundApplicationListComponent } from './refund-application-list.component';

describe('RefundApplicationListComponent', () => {
  let component: RefundApplicationListComponent;
  let fixture: ComponentFixture<RefundApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundApplicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
