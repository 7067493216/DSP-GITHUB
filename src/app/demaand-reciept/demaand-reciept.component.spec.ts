import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemaandRecieptComponent } from './demaand-reciept.component';

describe('DemaandRecieptComponent', () => {
  let component: DemaandRecieptComponent;
  let fixture: ComponentFixture<DemaandRecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemaandRecieptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemaandRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
