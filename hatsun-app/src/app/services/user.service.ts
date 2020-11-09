import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    constructor(private service: HttpService) {
        super();
    }
    
    findAllUsers() {
        debugger;
        return this.service.get('api/employee');
    }

    submitUser(userData: UserModel) {
        return this.service.post('api/employee/store', userData);
    }

    getIndividualRecord(userId: string) {
        return this.service.post('api/employee/show', { employeeID : userId});
    }

    updateUser(userData: UserModel, employeeID: String) {
        return this.service.post('api/employee/update', { userData: userData, employeeID: employeeID });
    }
}
