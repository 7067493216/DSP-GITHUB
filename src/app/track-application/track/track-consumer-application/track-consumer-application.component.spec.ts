import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackConsumerApplicationComponent } from './track-consumer-application.component';

describe('TrackConsumerApplicationComponent', () => {
  let component: TrackConsumerApplicationComponent;
  let fixture: ComponentFixture<TrackConsumerApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackConsumerApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackConsumerApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
