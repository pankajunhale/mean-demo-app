import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class GeographyService extends BaseService {
    constructor(private service: HttpService) {
        super();
    }
    
    findCountry() {
        debugger;
        return this.service.get('api/geography/Country');
    }

    findState(CountryId) {
        return this.service.post('api/geography/State', { CountryId: CountryId });
    }

    findCity(RegionCode) {
        return this.service.post('api/geography/City', { RegionCode: RegionCode });
    }
}
