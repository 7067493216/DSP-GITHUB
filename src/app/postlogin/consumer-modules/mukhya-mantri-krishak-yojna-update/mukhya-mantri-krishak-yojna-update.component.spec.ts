import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MukhyaMantriKrishakYojnaUpdateComponent } from './mukhya-mantri-krishak-yojna-update.component';

describe('MukhyaMantriKrishakYojnaUpdateComponent', () => {
  let component: MukhyaMantriKrishakYojnaUpdateComponent;
  let fixture: ComponentFixture<MukhyaMantriKrishakYojnaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MukhyaMantriKrishakYojnaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MukhyaMantriKrishakYojnaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
