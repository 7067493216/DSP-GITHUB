import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProposalListForRejectionToGmComponent } from './pending-proposal-list-for-rejection-to-gm.component';

describe('PendingProposalListForRejectionToGmComponent', () => {
  let component: PendingProposalListForRejectionToGmComponent;
  let fixture: ComponentFixture<PendingProposalListForRejectionToGmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingProposalListForRejectionToGmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingProposalListForRejectionToGmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
