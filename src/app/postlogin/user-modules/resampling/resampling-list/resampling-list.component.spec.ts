import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResamplingListComponent } from './resampling-list.component';

describe('ResamplingListComponent', () => {
  let component: ResamplingListComponent;
  let fixture: ComponentFixture<ResamplingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResamplingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResamplingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
