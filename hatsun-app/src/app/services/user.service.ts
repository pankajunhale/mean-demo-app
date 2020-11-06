import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    constructor(private service: HttpService) {
        super();
    }
    
    findAllUsers() {
        return this.service.get('api/employee');
    }
}
