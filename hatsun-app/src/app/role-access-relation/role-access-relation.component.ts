import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { MenuSetup, AccessMenu } from '../model/role.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-role-access-relation',
  templateUrl: './role-access-relation.component.html',
  styleUrls: ['./role-access-relation.component.css']
})
export class RoleAccessRelationComponent implements OnInit {
  $roleCreated = new BehaviorSubject(false)
  roleDropdown: any;
  role: string;
  MenuGroupDropdown: any;
  AccessModuleList: any;
  MenusGroup: any;
  MenuModule: any;
  MenuSetup : MenuSetup;
  AccessMenu : AccessMenu;
  reffArray = [];
  roleAccessForm = new FormGroup({
    RoleName: new FormControl(null),
    MenuGroup: new FormControl(null),
    MenuModule: new FormControl(null),
    AccessModule: new FormControl(null),
  })
  constructor(private roleService: RoleService) {
    this.MenuSetup = new MenuSetup();
    this.AccessMenu = new AccessMenu();
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
    for(let i = 0; i<this.reffArray.length; i++) {
      if(accessModule.AccessModuleName == this.reffArray[i].AccessModuleName) {
        this.reffArray.splice(accessModule.AccessModuleName, 1);
      }
    }
    for(let i = 0; i<accessModule.Roles.length; i++) {
      if(this.role == accessModule.Roles[i]) {
        foundStatus = true;
        accessModule.Roles.splice(this.role, 1);
        break;
      }
    }
    this.AccessMenu = new AccessMenu();
    this.AccessMenu.AccessModuleName = accessModule.AccessModuleName;
    if(foundStatus == false) accessModule.Roles.push(this.role);
    this.AccessMenu.Roles = accessModule.Roles;
    this.reffArray.push(this.AccessMenu);
  }

  resetAccessModule() {
    this.reffArray = [];
  }

  submit() {
    debugger;
    this.MenuSetup.AccessMenus = this.reffArray.filter(this.onlyUnique);
    this.MenuSetup.GroupId = this.MenusGroup._id;
    this.MenuSetup.GroupName = this.MenusGroup.GroupName;
    this.MenuSetup.MenuModuleName = this.MenuModule.MenuModuleName;

    this.roleService.updateMenuSetup(this.MenuSetup).subscribe((response) => {
      this.$roleCreated.next(true)
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
