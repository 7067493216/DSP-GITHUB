import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadEnhancementApplicationRejectionComponent } from './load-enhancement-application-rejection.component';

describe('LoadEnhancementApplicationRejectionComponent', () => {
  let component: LoadEnhancementApplicationRejectionComponent;
  let fixture: ComponentFixture<LoadEnhancementApplicationRejectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadEnhancementApplicationRejectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadEnhancementApplicationRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
