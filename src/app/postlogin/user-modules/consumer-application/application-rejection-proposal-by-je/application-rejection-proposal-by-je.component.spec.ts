import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRejectionProposalByJeComponent } from './application-rejection-proposal-by-je.component';

describe('ApplicationRejectionProposalByJeComponent', () => {
  let component: ApplicationRejectionProposalByJeComponent;
  let fixture: ComponentFixture<ApplicationRejectionProposalByJeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationRejectionProposalByJeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRejectionProposalByJeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
