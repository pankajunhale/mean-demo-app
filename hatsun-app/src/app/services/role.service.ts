import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { RoleModel } from '../model/role.model';

@Injectable({
    providedIn: 'root'
})
export class RoleService extends BaseService {
    constructor(private service: HttpService) {
        super();
    }

    submitRole(roleData: RoleModel) {
        return this.service.post('api/rolemaster/store', roleData);
    }

    findAllRoles() {
        return this.service.get('api/rolemaster');
    }

    getIndividualRoleRecord(roleId: string) {
        return this.service.post('api/rolemaster/show', { rolemasterID : roleId});
    }

    updateRole(roleData: RoleModel, rolemasterID: String) {
        return this.service.post('api/rolemaster/update', { roleData: roleData, rolemasterID: rolemasterID });
    }
}
