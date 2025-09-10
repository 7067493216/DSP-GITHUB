import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantComplainComponent } from './applicant-complain.component';

describe('ApplicantComplainComponent', () => {
  let component: ApplicantComplainComponent;
  let fixture: ComponentFixture<ApplicantComplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantComplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
