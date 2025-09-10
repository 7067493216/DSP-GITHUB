import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRejectionHandoverToGMComponent } from './application-rejection-handover-to-gm.component';

describe('ApplicationRejectionHandoverToGMComponent', () => {
  let component: ApplicationRejectionHandoverToGMComponent;
  let fixture: ComponentFixture<ApplicationRejectionHandoverToGMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationRejectionHandoverToGMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRejectionHandoverToGMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
