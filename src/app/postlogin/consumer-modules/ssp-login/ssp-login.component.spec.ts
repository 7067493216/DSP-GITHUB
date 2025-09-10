import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SspLoginComponent } from './ssp-login.component';

describe('SspLoginComponent', () => {
  let component: SspLoginComponent;
  let fixture: ComponentFixture<SspLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SspLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SspLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
