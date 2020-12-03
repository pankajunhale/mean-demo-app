import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMappingListComponent } from './file-mapping-list.component';

describe('FileMappingListComponent', () => {
  let component: FileMappingListComponent;
  let fixture: ComponentFixture<FileMappingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileMappingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileMappingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
