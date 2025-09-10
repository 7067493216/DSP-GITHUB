import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StcRemarkComponent } from './stc-remark.component';

describe('StcRemarkComponent', () => {
  let component: StcRemarkComponent;
  let fixture: ComponentFixture<StcRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StcRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StcRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
