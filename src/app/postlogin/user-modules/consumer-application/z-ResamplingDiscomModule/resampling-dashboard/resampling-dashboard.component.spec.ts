import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResamplingDashboardComponent } from './resampling-dashboard.component';

describe('ResamplingDashboardComponent', () => {
  let component: ResamplingDashboardComponent;
  let fixture: ComponentFixture<ResamplingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResamplingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResamplingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
