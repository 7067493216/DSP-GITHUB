import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerUpdateForAnyNwtComponent } from './consumer-update-for-any-nwt.component';

describe('ConsumerUpdateForAnyNwtComponent', () => {
  let component: ConsumerUpdateForAnyNwtComponent;
  let fixture: ComponentFixture<ConsumerUpdateForAnyNwtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerUpdateForAnyNwtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerUpdateForAnyNwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
