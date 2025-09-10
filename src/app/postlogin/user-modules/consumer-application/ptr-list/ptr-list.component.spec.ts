import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrListComponent } from './ptr-list.component';

describe('PtrListComponent', () => {
  let component: PtrListComponent;
  let fixture: ComponentFixture<PtrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
