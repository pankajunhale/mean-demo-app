import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { CustomerModel } from '../model/customer.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseService {
    constructor(private service: HttpService) {
        super();
    }
    
    findAllCustomers() {
        debugger;
        return this.service.get('api/customer');
    }

    submitCustomer(customerData: CustomerModel) {
        return this.service.post('api/customer/store', customerData);
    }

    getIndividualRecord(customerId: string) {
        return this.service.post('api/customer/show', { customermasterID : customerId});
    }

    updateCustomer(customerData: CustomerModel, customerId: String) {
        debugger;
        return this.service.post('api/customer/update', { customerData: customerData, customermasterID: customerId });
    }
}
