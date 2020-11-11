import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { CustomerModel } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  urlRequest: any;
  customerModel: CustomerModel;
  individualResponse: any;
  customerForm = new FormGroup({
    customerName: new FormControl(null, [Validators.required]),
    customerEmail: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    customerCountry: new FormControl(null, [Validators.required]),
    customerState: new FormControl(null, [Validators.required]),
    customerDistrict: new FormControl(null, [Validators.required]),
    customerAddress: new FormControl(null, [Validators.required]),
    customerMobile: new FormControl(null),
    customerContact: new FormControl(null),
    customerPincode: new FormControl(null),
    customerIsActive: new FormControl(null),
  });
  constructor(private customerService: CustomerService,private router: ActivatedRoute) {
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
        console.log('show response', this.individualResponse)
        this.customerModel = this.individualResponse.response;
      })
    }
  }

  submit() {
    this.customerService.submitCustomer(this.customerModel).subscribe((response: any) => {
      alert(response.message);
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

}