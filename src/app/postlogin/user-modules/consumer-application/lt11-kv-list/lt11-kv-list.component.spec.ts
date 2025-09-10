import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lt11KvListComponent } from './lt11-kv-list.component';

describe('Lt11KvListComponent', () => {
  let component: Lt11KvListComponent;
  let fixture: ComponentFixture<Lt11KvListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lt11KvListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lt11KvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
