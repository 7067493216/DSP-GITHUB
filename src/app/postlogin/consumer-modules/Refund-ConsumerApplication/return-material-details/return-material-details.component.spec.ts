import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnMaterialDetailsComponent } from './return-material-details.component';

describe('ReturnMaterialDetailsComponent', () => {
  let component: ReturnMaterialDetailsComponent;
  let fixture: ComponentFixture<ReturnMaterialDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnMaterialDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnMaterialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
