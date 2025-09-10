import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeSurveyBreakComponent } from './je-survey-break.component';

describe('JeSurveyBreakComponent', () => {
  let component: JeSurveyBreakComponent;
  let fixture: ComponentFixture<JeSurveyBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeSurveyBreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeSurveyBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
