import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerUpdateFormComponent } from './consumer-update-form.component';

describe('ConsumerUpdateFormComponent', () => {
  let component: ConsumerUpdateFormComponent;
  let fixture: ComponentFixture<ConsumerUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
