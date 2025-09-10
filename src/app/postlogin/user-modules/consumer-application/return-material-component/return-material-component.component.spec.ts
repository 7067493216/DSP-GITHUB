import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnMaterialComponentComponent } from './return-material-component.component';

describe('ReturnMaterialComponentComponent', () => {
  let component: ReturnMaterialComponentComponent;
  let fixture: ComponentFixture<ReturnMaterialComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnMaterialComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnMaterialComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
