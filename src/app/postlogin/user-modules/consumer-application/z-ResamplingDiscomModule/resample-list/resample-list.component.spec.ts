import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResampleListComponent } from './resample-list.component';

describe('ResampleListComponent', () => {
  let component: ResampleListComponent;
  let fixture: ComponentFixture<ResampleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResampleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResampleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
