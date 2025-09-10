import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCompleatedListComponent } from './finance-compleated-list.component';

describe('FinanceCompleatedListComponent', () => {
  let component: FinanceCompleatedListComponent;
  let fixture: ComponentFixture<FinanceCompleatedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceCompleatedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceCompleatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
