import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';
import { Router } from '../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
//import { win32 } from 'path';
import { BaseComponent } from '../model/base.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends BaseComponent implements OnInit {

  loginForm = new FormGroup({
    userEmail: new FormControl(null, [Validators.required]),
    userPassword: new FormControl(null, [Validators.required]),
  });
  constructor(private router: Router,private userService: UserService, private commonService: CommonService) { 
    super();
    this.init();
  }

  ngOnInit() {
  }


  auth(){
    this.userService.authenticate(this.loginForm.get('userEmail').value, this.loginForm.get('userPassword').value).subscribe((response) =>{
      this.commonService.setLocalStorageItem('isLoggedIn', '1');
      // this.router.navigate(['/userList']); //hack
      window.location.href = '/userList'
    },()=>{
      alert('Invalid credentials')
    })
  }

  private init(){
    if(this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)){
      this.commonService.redirectToPath('/userList',true);
    }
  }
  get getUserFormRef() { return this.loginForm.controls }
}
