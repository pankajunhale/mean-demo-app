import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userName:string;
  userModel: UserModel;
  userForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    userEmail: new FormControl(null, [Validators.required, Validators.pattern("[a-z]*")]),
    userCountry: new FormControl(null, [Validators.required]),
    userState: new FormControl(null, [Validators.required]),
    userDistrict: new FormControl(null, [Validators.required]),
    userLocation: new FormControl(null, [Validators.required]),
  });
  constructor(private userService: UserService) {
    this.userModel = new UserModel();
   }

  ngOnInit() {
  }

  submit() {
    debugger;
    this.userModel.UserID = "1";
    this.userModel.CustomerName = "Shreyas";
    this.userModel.CustomerID = "2";
    this.userModel.UserName = "Shubham";
    this.userModel.UserEmail = "shubham@gmail.com";
    this.userModel.UserMobile = "9856852563";
    this.userModel.Country = "99";
    this.userModel.State = "33";
    this.userModel.District = "33";
    this.userModel.Location = "Thane";
    this.userModel.AccessRoleName = "Account Owner";
    this.userModel.CMaccess = "Test";
    this.userModel.Password = "shubham123";
    this.userModel.RoleID = "10";
    this.userModel.isActive = true
    this.userModel.SecurityCode = "5285456";
    this.userModel.PasswordResetedOn = "testkhjkh";
    this.userModel.TokenNo = "45465";
    debugger;
    this.userService.submitUser(this.userModel)
  }

  get getUserFormRef() { return this.userForm.controls }

}
