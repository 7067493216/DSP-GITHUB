import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundRequestGenerateComponent } from './refund-request-generate.component';

describe('RefundRequestGenerateComponent', () => {
  let component: RefundRequestGenerateComponent;
  let fixture: ComponentFixture<RefundRequestGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundRequestGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundRequestGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
