import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplicationViewPageComponent } from './new-application-view-page.component';

describe('NewApplicationViewPageComponent', () => {
  let component: NewApplicationViewPageComponent;
  let fixture: ComponentFixture<NewApplicationViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApplicationViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApplicationViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
