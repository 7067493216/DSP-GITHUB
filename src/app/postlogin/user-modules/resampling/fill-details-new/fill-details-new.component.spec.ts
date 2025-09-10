import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillDetailsNewComponent } from './fill-details-new.component';

describe('FillDetailsNewComponent', () => {
  let component: FillDetailsNewComponent;
  let fixture: ComponentFixture<FillDetailsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillDetailsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillDetailsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
