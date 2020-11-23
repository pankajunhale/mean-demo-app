import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SampleModel } from '../model/sample.model';
import { BaseService } from './base.service';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class CommonService extends BaseService {
    private IS_LOGGED_IN = 'isLoggedIn';
    constructor(private service: HttpService, private router: Router) {
        super();
    }

    public findAllSampleData(): SampleModel {
        // fe - api post/get call
        // res / err
        // model set
        // return model
        // ...
        const obj = new SampleModel();
        obj.id = '1';
        obj.name = 'abc';
        obj.displayCreatedAt = '10-10-2020'; // momentjs
        return obj;
    }

    findAllUsers() {
        return this.service.get('api/employee');
    }

    public getLocalStorageItem(key: string): string{
        return localStorage.getItem(key);
    }

    public setLocalStorageItem(key: string, value: string): void {
        localStorage.setItem(key,value);
    }

    public removeLocalStorageItem(key: string): void {
        localStorage.removeItem(key);
    }

    public isUserLoggedIn(key: string): boolean{
        const data = this.getLocalStorageItem(this.IS_LOGGED_IN);
        let flag = false;
        if (data) {
           flag = true;
        }
       return flag;
    }
    public loggedOut(): void{
        this.removeLocalStorageItem(this.IS_LOGGED_IN);
        this.redirectToPath('/login',true)

    }

    public redirectToPath(path: string,isPageRefresh: boolean): void{
        if(isPageRefresh){
            window.location.href = path;
        }
    }

}