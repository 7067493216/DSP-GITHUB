import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRejectionProposalComponent } from './application-rejection-proposal.component';

describe('ApplicationRejectionProposalComponent', () => {
  let component: ApplicationRejectionProposalComponent;
  let fixture: ComponentFixture<ApplicationRejectionProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationRejectionProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRejectionProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
