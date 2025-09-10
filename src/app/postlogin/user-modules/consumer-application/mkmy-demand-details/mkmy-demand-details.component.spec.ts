import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MkmyDemandDetailsComponent } from './mkmy-demand-details.component';

describe('MkmyDemandDetailsComponent', () => {
  let component: MkmyDemandDetailsComponent;
  let fixture: ComponentFixture<MkmyDemandDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MkmyDemandDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MkmyDemandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
