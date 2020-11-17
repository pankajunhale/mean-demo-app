import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../model/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userName:string;
  userModel: UserModel = null;
  individualResponse: any;
  urlRequest: any;
  roleDropdown: any;
  userForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    userEmail: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    userCountry: new FormControl(null, [Validators.required]),
    userState: new FormControl(null, [Validators.required]),
    userDistrict: new FormControl(null, [Validators.required]),
    userLocation: new FormControl(null, [Validators.required]),
    userMobile: new FormControl(null),
    userPassword: new FormControl(null),
    userRole: new FormControl(null),
    userIsActive: new FormControl(null),
  });
  constructor(private userService: UserService, private router: ActivatedRoute, private roleService: RoleService) {
    this.userModel = new UserModel();
    this.router.params.subscribe(params => {
      this.urlRequest = params;
    })
   }

  ngOnInit() {
    if(this.urlRequest.pageStatus == 'view'){
      this.userForm.disable();
    }
    if (this.urlRequest.pageStatus != 'create' ){
      debugger;
      this.userService.getIndividualRecord(this.urlRequest.id).subscribe((response: any) => {
        this.individualResponse = response;
        this.userModel = this.individualResponse.response;
      })
    }
    this.roleService.findAllRoles().subscribe((response: any) => {
      this.roleDropdown = response.response;
    })
  }

  submit() {
    this.userService.submitUser(this.userModel).subscribe((response: any) => {
      alert(response.success.message);
    })
  }

  update() {
    this.userService.updateUser(this.userModel, this.urlRequest.id).subscribe((response: any) => {
      alert(response.success.message);
    })
  }

  get getUserFormRef() { return this.userForm.controls }

}
