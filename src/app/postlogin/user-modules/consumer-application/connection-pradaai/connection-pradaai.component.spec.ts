import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionPradaaiComponent } from './connection-pradaai.component';

describe('ConnectionPradaaiComponent', () => {
  let component: ConnectionPradaaiComponent;
  let fixture: ComponentFixture<ConnectionPradaaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionPradaaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionPradaaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
