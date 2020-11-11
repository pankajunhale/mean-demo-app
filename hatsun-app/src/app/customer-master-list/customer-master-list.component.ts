import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-master-list',
  templateUrl: './customer-master-list.component.html',
  styleUrls: ['./customer-master-list.component.css']
})
export class CustomerMasterListComponent implements OnInit {
  customerDataList: any;
  dtOptions: DataTables.Settings = {};
  constructor(private customerService: CustomerService) { 
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
      console.log(response)
      debugger;
      this.customerDataList = response;
    });
  }

}
