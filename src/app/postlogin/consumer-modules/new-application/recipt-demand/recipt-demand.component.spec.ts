import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptDemandComponent } from './recipt-demand.component';

describe('ReciptDemandComponent', () => {
  let component: ReciptDemandComponent;
  let fixture: ComponentFixture<ReciptDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciptDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciptDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
