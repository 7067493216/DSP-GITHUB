import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialCompComponent } from './trial-comp.component';

describe('TrialCompComponent', () => {
  let component: TrialCompComponent;
  let fixture: ComponentFixture<TrialCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
