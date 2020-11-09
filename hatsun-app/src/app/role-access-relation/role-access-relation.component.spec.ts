import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAccessRelationComponent } from './role-access-relation.component';

describe('RoleAccessRelationComponent', () => {
  let component: RoleAccessRelationComponent;
  let fixture: ComponentFixture<RoleAccessRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAccessRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAccessRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
