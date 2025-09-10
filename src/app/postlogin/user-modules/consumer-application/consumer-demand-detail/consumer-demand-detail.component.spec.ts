import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerDemandDetailComponent } from './consumer-demand-detail.component';

describe('ConsumerDemandDetailComponent', () => {
  let component: ConsumerDemandDetailComponent;
  let fixture: ComponentFixture<ConsumerDemandDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerDemandDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerDemandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
