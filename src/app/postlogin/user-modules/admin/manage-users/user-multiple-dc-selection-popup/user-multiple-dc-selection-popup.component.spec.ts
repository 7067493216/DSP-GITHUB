import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMultipleDcSelectionPopupComponent } from './user-multiple-dc-selection-popup.component';

describe('UserMultipleDcSelectionPopupComponent', () => {
  let component: UserMultipleDcSelectionPopupComponent;
  let fixture: ComponentFixture<UserMultipleDcSelectionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMultipleDcSelectionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMultipleDcSelectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
