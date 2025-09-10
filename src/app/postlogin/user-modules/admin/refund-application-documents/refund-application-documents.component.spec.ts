import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundApplicationDocumentsComponent } from './refund-application-documents.component';

describe('RefundApplicationDocumentsComponent', () => {
  let component: RefundApplicationDocumentsComponent;
  let fixture: ComponentFixture<RefundApplicationDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundApplicationDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundApplicationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
