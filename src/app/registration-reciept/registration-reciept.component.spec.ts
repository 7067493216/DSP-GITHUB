import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRecieptComponent } from './registration-reciept.component';

describe('RegistrationRecieptComponent', () => {
  let component: RegistrationRecieptComponent;
  let fixture: ComponentFixture<RegistrationRecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationRecieptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
