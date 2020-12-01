import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { BaseComponent } from '../model/base.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends BaseComponent implements OnInit {
  PageStatus: string = "loginPage"
  SharedVariable: string = "shared";
  private emailRegEx = '^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$'
  $IsInvalidCredentials = new BehaviorSubject(false);
  loginForm = new FormGroup({
    userEmail: new FormControl(null, [Validators.required,Validators.pattern(this.emailRegEx)]),
    userPassword: new FormControl(null, [Validators.required]),
  });

  emailForm = new FormGroup({
    userEmail: new FormControl(null, [Validators.required])
  });

  resetForm = new FormGroup({
    otp: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  constructor(private router: Router,private userService: UserService, private commonService: CommonService) { 
    super();
    this.init();
  }

  ngOnInit() {
  }


  auth(){
    debugger;
    this.$IsInvalidCredentials.next(false);
    this.userService.authenticate(this.loginForm.get('userEmail').value, this.loginForm.get('userPassword').value).subscribe((response) =>{
      debugger;
      this.commonService.setLocalStorageItem('isLoggedIn', '1');
      this.commonService.setLocalStorageItem('roleId', response.resultData.RoleID);
      debugger;
      window.location.href = '/userList'
    },(error)=>{
      debugger
      console.log('Invalid credentials',error);
      if(error.status === 401){
        this.$IsInvalidCredentials.next(true);
      }
      // error - class set /prop set
      // div - show
      // status code {}
    });
  }


  private init(){
    if(this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)){
      this.commonService.redirectToPath('/userList',true);
    }
  }
  get getUserFormRef() { return this.loginForm.controls }

  enterEmailPage() {
    this.PageStatus = "emailPage";
  }

  sendOTP() {
    this.userService.generateOTP(this.emailForm.get('userEmail').value).subscribe(()=>{
      this.PageStatus = "resetPassPage";
    })
  }

  resetPassword() {
    this.userService.resetPassword(this.resetForm.get('otp').value,this.resetForm.get('password').value).subscribe(()=>{
      this.PageStatus = "loginPage"; 
    })
  }
}