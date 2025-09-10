import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWithRemarkHandlerDialogComponent } from './dialog-with-remark-handler-dialog.component';

describe('DialogWithRemarkHandlerDialogComponent', () => {
  let component: DialogWithRemarkHandlerDialogComponent;
  let fixture: ComponentFixture<DialogWithRemarkHandlerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWithRemarkHandlerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWithRemarkHandlerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
