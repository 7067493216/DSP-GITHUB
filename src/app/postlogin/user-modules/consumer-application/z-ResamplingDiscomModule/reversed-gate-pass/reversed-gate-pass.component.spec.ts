import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversedGatePassComponent } from './reversed-gate-pass.component';

describe('ReversedGatePassComponent', () => {
  let component: ReversedGatePassComponent;
  let fixture: ComponentFixture<ReversedGatePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReversedGatePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversedGatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
