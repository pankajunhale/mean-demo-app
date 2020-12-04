import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { RoleService } from '../services/role.service';
import { RoleModel, RoleSelectionFilterModel } from '../model/role.model';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})
export class RoleMasterComponent implements OnInit {
  roleModel: RoleModel;
  rolDataList: any;
  pageStatus: string;
  roleId: string;
  roleDropdown: any;
  roleFilter: RoleSelectionFilterModel;
  roleMasterForm = new FormGroup({
    roleName: new FormControl(null, [Validators.required]),
    roleDescription: new FormControl(null, [Validators.required]),
    roleIsActive: new FormControl(null, [Validators.required])
  })
  constructor(private roleService: RoleService) {
    this.roleModel = new RoleModel();
    this.roleFilter = new RoleSelectionFilterModel();
  }

  ngOnInit() {
    this.roleService.findRolesDropdown().subscribe((response) => {
      console.log(response)
      this.roleDropdown = response.response;
    });
  }

  submit() {
    debugger;
    this.roleService.submitRole(this.roleModel).subscribe((response: any) => {
      alert(response.message);
    })
  }

  search() {
    debugger;
    this.roleFilter.RoleId = $("#role-id").val().toString();
    this.roleFilter.Status = $("#status").val().toString();
    this.roleService.findAllRoles(this.roleFilter).subscribe((response) => {
      this.rolDataList = response.response;
    });
  }

  clear() {
    $("#role-id").val("");
    $("#status").val("");
  }

  add() {
    this.roleMasterForm.enable();
    this.roleModel = new RoleModel();
    this.pageStatus = "create";
  }

  view(pageStatus: string, roleId: string) {
    this.roleId = roleId;
    this.pageStatus = pageStatus;
    if(this.pageStatus == "view"){
      this.roleMasterForm.disable();
    } else {
      this.roleMasterForm.enable();
    }
    this.roleService.getIndividualRoleRecord(roleId).subscribe((response: any) => {
      this.roleModel = response.response;
    })
  }

  update() {
    this.roleService.updateRole(this.roleModel, this.roleId).subscribe((response: any) => {
      debugger;
      alert(response.message);
    })
  }
}
