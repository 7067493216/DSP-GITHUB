import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseDemandRecieptComponent } from './revise-demand-reciept.component';

describe('ReviseDemandRecieptComponent', () => {
  let component: ReviseDemandRecieptComponent;
  let fixture: ComponentFixture<ReviseDemandRecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviseDemandRecieptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviseDemandRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
