import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConeectionPraddaiForNgbComponent } from './coneection-praddai-for-ngb.component';

describe('ConeectionPraddaiForNgbComponent', () => {
  let component: ConeectionPraddaiForNgbComponent;
  let fixture: ComponentFixture<ConeectionPraddaiForNgbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConeectionPraddaiForNgbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConeectionPraddaiForNgbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
