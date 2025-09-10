import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAcceptanceRejectionAuthorityComponent } from './application-acceptance-rejection-authority.component';

describe('ApplicationAcceptanceRejectionAuthorityComponent', () => {
  let component: ApplicationAcceptanceRejectionAuthorityComponent;
  let fixture: ComponentFixture<ApplicationAcceptanceRejectionAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationAcceptanceRejectionAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationAcceptanceRejectionAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
