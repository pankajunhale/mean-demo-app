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

    findAllRoles(roleFilter) {
        return this.service.post('api/rolemaster', roleFilter);
    }

    findRolesDropdown() {
        return this.service.get('api/rolemaster/roleDropdown');
    }

    getIndividualRoleRecord(roleId: string) {
        return this.service.post('api/rolemaster/show', { rolemasterID : roleId});
    }

    updateRole(roleData: RoleModel, rolemasterID: String) {
        return this.service.post('api/rolemaster/update', { roleData: roleData, rolemasterID: rolemasterID });
    }

    findMenuGroupMaster(){
        return this.service.get('api/menumaster');
    }

    findMenuModule(MenuGroupId) {
        return this.service.post('api/menumaster/show', { MenuGroupId : MenuGroupId});
    }

    findAccessModule(MenuModuleId) {
        return this.service.post('api/menumaster/showAcessModule', { MenuModuleId : MenuModuleId});
    }

    findMenuSetup(roleID){
        return this.service.post('api/menumaster/showMenuSetup', { roleID: roleID });
    }

    findMenuSetupList() {
        return this.service.get('api/menumaster/showMenuSetupList');
    }

    updateMenuSetup(menuSetupData) {
        return this.service.post('api/menumaster/updateMenuSetup', { menuSetupData : menuSetupData });
    }
}
