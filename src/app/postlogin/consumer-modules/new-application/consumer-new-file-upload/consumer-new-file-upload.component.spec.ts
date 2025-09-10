import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerNewFileUploadComponent } from './consumer-new-file-upload.component';

describe('ConsumerNewFileUploadComponent', () => {
  let component: ConsumerNewFileUploadComponent;
  let fixture: ComponentFixture<ConsumerNewFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerNewFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerNewFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
