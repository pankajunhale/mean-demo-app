import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role-access-relation',
  templateUrl: './role-access-relation.component.html',
  styleUrls: ['./role-access-relation.component.css']
})
export class RoleAccessRelationComponent implements OnInit {
  roleDropdown: any;
  MenuGroupDropdown: any;
  MenuModuleDropdown: any;
  AccessModuleList: any;
  subModuleId:string = "";
  constructor(private roleService: RoleService) {

   }

  ngOnInit() {
    this.roleService.findAllRoles().subscribe((response) => {
      this.roleDropdown = response.response;
    });

    this.roleService.findMenuGroupMaster().subscribe((response) => {
      debugger;
      this.MenuGroupDropdown = response.response;
    });
  }

  getMenuModule(MenuGroupId) {
    this.roleService.findMenuModule(MenuGroupId).subscribe((response) => {
      debugger;
      this.MenuModuleDropdown = response.response;
    });
  }

  getAccessModule(MenuModule){
    let val = $("#sub-module").val();
    this.roleService.findAccessModule(val).subscribe((response) => {
      debugger;
      this.AccessModuleList = response.response;
    });
  }

}
