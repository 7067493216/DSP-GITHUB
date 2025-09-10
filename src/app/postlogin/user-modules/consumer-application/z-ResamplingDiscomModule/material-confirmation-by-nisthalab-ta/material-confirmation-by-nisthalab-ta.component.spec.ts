import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialConfirmationByNisthalabTaComponent } from './material-confirmation-by-nisthalab-ta.component';

describe('MaterialConfirmationByNisthalabTaComponent', () => {
  let component: MaterialConfirmationByNisthalabTaComponent;
  let fixture: ComponentFixture<MaterialConfirmationByNisthalabTaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialConfirmationByNisthalabTaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialConfirmationByNisthalabTaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
