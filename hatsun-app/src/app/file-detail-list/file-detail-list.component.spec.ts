import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDetailListComponent } from './file-detail-list.component';

describe('FileDetailListComponent', () => {
  let component: FileDetailListComponent;
  let fixture: ComponentFixture<FileDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
