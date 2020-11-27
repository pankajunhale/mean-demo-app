import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineFileDetailsComponent } from './define-file-details.component';

describe('DefineFileDetailsComponent', () => {
  let component: DefineFileDetailsComponent;
  let fixture: ComponentFixture<DefineFileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineFileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineFileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
