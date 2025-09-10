import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerFileDownloadComponent } from './consumer-file-download.component';

describe('ConsumerFileDownloadComponent', () => {
  let component: ConsumerFileDownloadComponent;
  let fixture: ComponentFixture<ConsumerFileDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerFileDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerFileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
