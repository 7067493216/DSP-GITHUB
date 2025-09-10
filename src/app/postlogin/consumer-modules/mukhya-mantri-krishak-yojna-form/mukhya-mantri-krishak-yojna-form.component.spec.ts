import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MukhyaMantriKrishakYojnaFormComponent } from './mukhya-mantri-krishak-yojna-form.component';

describe('MukhyaMantriKrishakYojnaFormComponent', () => {
  let component: MukhyaMantriKrishakYojnaFormComponent;
  let fixture: ComponentFixture<MukhyaMantriKrishakYojnaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MukhyaMantriKrishakYojnaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MukhyaMantriKrishakYojnaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
