import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { BehaviorSubject } from 'rxjs';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-customer-master-list',
  templateUrl: './customer-master-list.component.html',
  styleUrls: ['./customer-master-list.component.css']
})
export class CustomerMasterListComponent implements OnInit {
  private IS_LOGGED_IN = 'isLoggedIn';
  customerDataList: any;
  dtOptions: DataTables.Settings = {};
  constructor(private customerService: CustomerService, private commonService:CommonService) {
    this.init();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      scrollX: true
    };
  }

  ngOnInit() {
  }

  public search() {
    debugger;
    this.customerService.findAllCustomers().subscribe((response) => {
      this.customerDataList = response;
    });
  }
  private init() {
    if (!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/login', true);
    }
  }

}
