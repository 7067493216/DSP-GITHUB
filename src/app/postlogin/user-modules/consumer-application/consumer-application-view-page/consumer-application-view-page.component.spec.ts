import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerApplicationViewPageComponent } from './consumer-application-view-page.component';

describe('ConsumerApplicationViewPageComponent', () => {
  let component: ConsumerApplicationViewPageComponent;
  let fixture: ComponentFixture<ConsumerApplicationViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerApplicationViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerApplicationViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
