import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingReportSubmitComponent } from './testing-report-submit.component';

describe('TestingReportSubmitComponent', () => {
  let component: TestingReportSubmitComponent;
  let fixture: ComponentFixture<TestingReportSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingReportSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingReportSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
