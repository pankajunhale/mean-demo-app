import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    userResponse: any = "default value";
    constructor(private service: HttpService) {
        super();
    }
    
    findAllUsers(userSelectionFilter) {
        debugger;
        return this.service.post('api/employee', userSelectionFilter);
    }

    findUsersDropdown() {
        debugger;
        return this.service.get('api/employee/empDropdown');
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

    authenticate(userEmail: string,Password:string ): Observable<any>{
        this.userResponse = this.service.post('api/employee/login',{UserEmail:userEmail,Password:Password})
        return this.userResponse
    }

    generateOTP(userEmail:String): Observable<any>{
        debugger;
        return this.service.post('api/employee/forgotPassword',{UserEmail:userEmail})
    }
    resetPassword(Otp : String,Password:String) : Observable<any>{
        return this.service.post('api/employee/reset', { otp: Otp,Password : Password})
    } 
}
