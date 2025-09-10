import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvrsConfirmationByJeComponent } from './ivrs-confirmation-by-je.component';

describe('IvrsConfirmationByJeComponent', () => {
  let component: IvrsConfirmationByJeComponent;
  let fixture: ComponentFixture<IvrsConfirmationByJeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvrsConfirmationByJeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvrsConfirmationByJeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
