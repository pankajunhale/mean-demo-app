import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { BehaviorSubject } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { GeographyService } from '../services/geography.service';
import { CustomerSelectionFilterModel } from '../model/customer.model';


@Component({
  selector: 'app-customer-master-list',
  templateUrl: './customer-master-list.component.html',
  styleUrls: ['./customer-master-list.component.css']
})
export class CustomerMasterListComponent implements OnInit {
  private IS_LOGGED_IN = 'isLoggedIn';
  customerDataList: any;
  countryDropdown: any;
  stateDropdown: any;
  districtDropdown: any;
  customerAutocomplete: any;
  CustomerId: String;
  CustomerSelectionFilter: CustomerSelectionFilterModel
  keyword = 'CustomerName';
  dtOptions: DataTables.Settings = {};
  constructor(private customerService: CustomerService,
    private geographyService: GeographyService,
    private commonService: CommonService) {
    this.init();
    this.CustomerSelectionFilter = new CustomerSelectionFilterModel();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      scrollX: true
    };
  }

  ngOnInit() {
    this.geographyService.findCountry().subscribe((response: any) => {
      debugger;
      this.countryDropdown = response.response;
    })

    this.customerService.findCustomersDropdown().subscribe((response: any) => {
      debugger;
      this.customerAutocomplete = response.response;
    })
  }

  selectEvent(item) {
    debugger;
    this.CustomerId = item._id;
  }

  findState() {
    debugger;
    let country = $("#country").val();
    this.geographyService.findState(country).subscribe((response: any) => {
      debugger;
      this.stateDropdown = response.response;
    })
  }

  findCity() {
    let state = $("#state").val();
    this.geographyService.findCity(state).subscribe((response: any) => {
      this.districtDropdown = response.response;
    })
  }

  public search() {
    debugger;
    var that = this;
    this.CustomerSelectionFilter.CustomerID = this.CustomerId;
    this.CustomerSelectionFilter.Country = $("#country").val().toString();
    this.CustomerSelectionFilter.State = $("#state").val().toString();
    this.CustomerSelectionFilter.Distrcit = $("#district").val().toString();
    this.CustomerSelectionFilter.IsActive = $("#status").val().toString();
    this.customerService.findAllCustomers(this.CustomerSelectionFilter).subscribe((response) => {
      console.log(response)
      debugger;
      this.customerDataList = response.response;
    });
  }
  private init() {
    if (!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/login', true);
    }
  }

  clear() {
    $("#country").val("");
    $("#state").val("");
    $("#district").val("");
    $("#status").val("");
    $("#role").val("");
    this.CustomerId = "";
  }

}
