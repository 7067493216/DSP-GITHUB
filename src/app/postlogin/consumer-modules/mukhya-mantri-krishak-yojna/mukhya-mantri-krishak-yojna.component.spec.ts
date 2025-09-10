import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MukhyaMantriKrishakYojnaComponent } from './mukhya-mantri-krishak-yojna.component';

describe('MukhyaMantriKrishakYojnaComponent', () => {
  let component: MukhyaMantriKrishakYojnaComponent;
  let fixture: ComponentFixture<MukhyaMantriKrishakYojnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MukhyaMantriKrishakYojnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MukhyaMantriKrishakYojnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
