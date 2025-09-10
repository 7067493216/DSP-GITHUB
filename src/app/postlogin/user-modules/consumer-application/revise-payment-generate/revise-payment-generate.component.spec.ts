import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisePaymentGenerateComponent } from './revise-payment-generate.component';

describe('RevisePaymentGenerateComponent', () => {
  let component: RevisePaymentGenerateComponent;
  let fixture: ComponentFixture<RevisePaymentGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisePaymentGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisePaymentGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
