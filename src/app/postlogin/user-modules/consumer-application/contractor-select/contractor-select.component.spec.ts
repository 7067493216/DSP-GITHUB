import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSelectComponent } from './contractor-select.component';

describe('ContractorSelectComponent', () => {
  let component: ContractorSelectComponent;
  let fixture: ComponentFixture<ContractorSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
