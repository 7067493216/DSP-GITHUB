import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerResetPasswordComponent } from './consumer-reset-password.component';

describe('ConsumerResetPasswordComponent', () => {
  let component: ConsumerResetPasswordComponent;
  let fixture: ComponentFixture<ConsumerResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
