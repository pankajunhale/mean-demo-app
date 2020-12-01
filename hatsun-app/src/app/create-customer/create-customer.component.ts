import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { CustomerModel } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
import { GeographyService } from '../services/geography.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  $customerCreated = new BehaviorSubject(false);
  private emailRegEx = '^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$'
  urlRequest: any;
  customerModel: CustomerModel;
  individualResponse: any;
  countryDropdown: any;
  stateDropdown: any;
  districtDropdown: any;

  customerForm = new FormGroup({
    customerName: new FormControl(null, [Validators.required]),
    customerEmail: new FormControl(null, [Validators.required, Validators.pattern(this.emailRegEx)]),
    customerCountry: new FormControl(null, [Validators.required]),
    customerState: new FormControl(null, [Validators.required]),
    customerDistrict: new FormControl(null, [Validators.required]),
    customerAddress: new FormControl(null, [Validators.required]),
    customerMobile: new FormControl(null),
    customerContact: new FormControl(null),
    customerPincode: new FormControl(null),
    customerIsActive: new FormControl(null),
  });
  constructor(private customerService: CustomerService,
    private route : Router,
    private router: ActivatedRoute,
    private geographyService: GeographyService) {
    this.customerModel = new CustomerModel();
    this.router.params.subscribe(params => {
      this.urlRequest = params;
    })
   }

  ngOnInit() {
    if(this.urlRequest.pageStatus == 'view'){
      this.customerForm.disable();
    }
    if (this.urlRequest.pageStatus != 'create' ){
      debugger;
      this.customerService.getIndividualRecord(this.urlRequest.id).subscribe((response: any) => {
        this.individualResponse = response;
        this.customerModel = this.individualResponse.response;
        this.findState();
        this.findCity();
      })
    }
    this.geographyService.findCountry().subscribe((response: any) => {
      this.countryDropdown = response.response;
    })
  }

  submit() {
    //this.$customerCreated.next(false);
    this.customerService.submitCustomer(this.customerModel).subscribe((response: any) => {
      debugger;
      console.log(response)
      //this.$customerCreated.next(true);
      alert('customer created')
      this.route.navigateByUrl('/customerList')

    },(error) => {
        if (error.status === 401) {
          alert('email id Already Exists')
          //console.log('error' + error)
        }
    })
  }

  update() {
    debugger;
    this.customerService.updateCustomer(this.customerModel, this.urlRequest.id).subscribe((response: any) => {
      debugger;
      alert(response.message);
    })
  }

  get getcustomerFormRef() { return this.customerForm.controls }

  findState() {
    debugger;
    this.geographyService.findState(this.customerModel.Country).subscribe((response: any) => {
      this.stateDropdown = response.response;
    })
  }

  findCity() {
    this.geographyService.findCity(this.customerModel.State).subscribe((response: any) => {
      this.districtDropdown = response.response;
    })
  }
}
