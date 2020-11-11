import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMasterListComponent } from './customer-master-list.component';

describe('CustomerMasterListComponent', () => {
  let component: CustomerMasterListComponent;
  let fixture: ComponentFixture<CustomerMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
