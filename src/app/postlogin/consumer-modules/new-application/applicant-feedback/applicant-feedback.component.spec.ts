import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantFeedbackComponent } from './applicant-feedback.component';

describe('ApplicantFeedbackComponent', () => {
  let component: ApplicantFeedbackComponent;
  let fixture: ComponentFixture<ApplicantFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
