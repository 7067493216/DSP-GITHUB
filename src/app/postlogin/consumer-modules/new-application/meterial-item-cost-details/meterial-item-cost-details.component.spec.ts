import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterialItemCostDetailsComponent } from './meterial-item-cost-details.component';

describe('MeterialItemCostDetailsComponent', () => {
  let component: MeterialItemCostDetailsComponent;
  let fixture: ComponentFixture<MeterialItemCostDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterialItemCostDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterialItemCostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
