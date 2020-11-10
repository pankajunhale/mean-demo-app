import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { RoleService } from '../services/role.service';
import { RoleModel } from '../model/role.model';

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
  roleMasterForm = new FormGroup({
    roleName: new FormControl(null, [Validators.required]),
    roleDescription: new FormControl(null, [Validators.required]),
    roleIsActive: new FormControl(null, [Validators.required])
  })
  constructor(private roleService: RoleService) {
    this.roleModel = new RoleModel();
  }

  ngOnInit() {
  }

  submit() {
    debugger;
    this.roleService.submitRole(this.roleModel).subscribe((response: any) => {
      alert(response.message);
    })
  }

  search() {
    debugger;
    this.roleService.findAllRoles().subscribe((response) => {
      console.log(response)
      this.rolDataList = response;
    });
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
