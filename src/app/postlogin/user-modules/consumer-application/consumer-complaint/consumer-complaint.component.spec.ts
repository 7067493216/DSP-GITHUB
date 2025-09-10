import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerComplaintComponent } from './consumer-complaint.component';

describe('ConsumerComplaintComponent', () => {
  let component: ConsumerComplaintComponent;
  let fixture: ComponentFixture<ConsumerComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerComplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
