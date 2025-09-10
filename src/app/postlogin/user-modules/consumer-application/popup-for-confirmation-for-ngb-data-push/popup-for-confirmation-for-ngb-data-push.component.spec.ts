import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupForConfirmationForNgbDataPushComponent } from './popup-for-confirmation-for-ngb-data-push.component';

describe('PopupForConfirmationForNgbDataPushComponent', () => {
  let component: PopupForConfirmationForNgbDataPushComponent;
  let fixture: ComponentFixture<PopupForConfirmationForNgbDataPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupForConfirmationForNgbDataPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupForConfirmationForNgbDataPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
