import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMobileNumberByAdminComponent } from './change-mobile-number-by-admin.component';

describe('ChangeMobileNumberByAdminComponent', () => {
  let component: ChangeMobileNumberByAdminComponent;
  let fixture: ComponentFixture<ChangeMobileNumberByAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMobileNumberByAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMobileNumberByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
