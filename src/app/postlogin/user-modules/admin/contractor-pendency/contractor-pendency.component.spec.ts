import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPendencyComponent } from './contractor-pendency.component';

describe('ContractorPendencyComponent', () => {
  let component: ContractorPendencyComponent;
  let fixture: ComponentFixture<ContractorPendencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorPendencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorPendencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
