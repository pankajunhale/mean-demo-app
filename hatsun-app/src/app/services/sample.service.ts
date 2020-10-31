import { Injectable } from '@angular/core';
import { SampleModel } from '../model/sample.model';
import { BaseService } from './base.service';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class SampleService extends BaseService {

    constructor(private service: HttpService) {
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
        return this.service.get('api/v1/user');
    }


}
