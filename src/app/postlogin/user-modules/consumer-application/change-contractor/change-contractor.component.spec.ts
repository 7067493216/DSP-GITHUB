import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeContractorComponent } from './change-contractor.component';

describe('ChangeContractorComponent', () => {
  let component: ChangeContractorComponent;
  let fixture: ComponentFixture<ChangeContractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeContractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
