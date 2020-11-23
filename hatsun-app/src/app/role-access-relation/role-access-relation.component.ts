import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { MenuSetup } from '../model/role.model';

@Component({
  selector: 'app-role-access-relation',
  templateUrl: './role-access-relation.component.html',
  styleUrls: ['./role-access-relation.component.css']
})
export class RoleAccessRelationComponent implements OnInit {
  roleDropdown: any;
  role: string;
  MenuGroupDropdown: any;
  AccessModuleList: any;
  MenusGroup: any;
  MenuModule: any;
  MenuSetup : MenuSetup;
  roleAccessForm = new FormGroup({
    RoleName: new FormControl(null),
    MenuGroup: new FormControl(null),
    MenuModule: new FormControl(null),
    AccessModule: new FormControl(null),
  })
  constructor(private roleService: RoleService) {
    this.MenuSetup = new MenuSetup();
   }

  ngOnInit() {
    this.roleService.findAllRoles().subscribe((response) => {
      this.roleDropdown = response.response;
    });

    this.roleService.findMenuSetupList().subscribe((response) => {
      this.MenuGroupDropdown = response.response;
    });
  }

  PageAccess(accessModule) {
    debugger;
    let foundStatus: boolean = false;
    this.MenuSetup.AccessModuleName = accessModule.AccessModuleName;

    for(let i = 0; i<accessModule.Roles.length; i++) {
      if(this.role == accessModule.Roles[i]) {
        foundStatus = true;
        break;
      }
    }

    if(foundStatus == false) accessModule.Roles.push(this.role);
    
    this.MenuSetup.Roles = accessModule.Roles;
    this.MenuSetup.AccessModuleName = accessModule.AccessModuleName;
  }

  submit() {
    debugger;
    this.MenuSetup.GroupId = this.MenusGroup._id;
    this.MenuSetup.GroupName = this.MenusGroup.GroupName;
    this.MenuSetup.MenuModuleName = this.MenuModule.MenuModuleName;

    console.log("Final sending data - " + this.MenuSetup);
  }
}
