import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrfUploadFileComponent } from './trf-upload-file.component';

describe('TrfUploadFileComponent', () => {
  let component: TrfUploadFileComponent;
  let fixture: ComponentFixture<TrfUploadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrfUploadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrfUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
