import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferApplicationToSspPortalForIvrsSubmissionComponent } from './transfer-application-to-ssp-portal-for-ivrs-submission.component';

describe('TransferApplicationToSspPortalForIvrsSubmissionComponent', () => {
  let component: TransferApplicationToSspPortalForIvrsSubmissionComponent;
  let fixture: ComponentFixture<TransferApplicationToSspPortalForIvrsSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferApplicationToSspPortalForIvrsSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferApplicationToSspPortalForIvrsSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
