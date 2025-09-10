import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseDemandDetailsComponent } from './revise-demand-details.component';

describe('ReviseDemandDetailsComponent', () => {
  let component: ReviseDemandDetailsComponent;
  let fixture: ComponentFixture<ReviseDemandDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviseDemandDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviseDemandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
