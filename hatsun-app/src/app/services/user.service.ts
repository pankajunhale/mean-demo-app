import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { UserModel } from '../model/user.model';

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
        debugger;
        return this.service.post('api/employee/store', userData);
    }
}
