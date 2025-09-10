import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplingMultipleDtrComponent } from './sampling-multiple-dtr.component';

describe('SamplingMultipleDtrComponent', () => {
  let component: SamplingMultipleDtrComponent;
  let fixture: ComponentFixture<SamplingMultipleDtrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplingMultipleDtrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplingMultipleDtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
