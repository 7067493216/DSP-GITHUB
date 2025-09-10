import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConsumerDetailsComponent } from './update-consumer-details.component';

describe('UpdateConsumerDetailsComponent', () => {
  let component: UpdateConsumerDetailsComponent;
  let fixture: ComponentFixture<UpdateConsumerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateConsumerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConsumerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
