import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';
import { Router } from '../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    userEmail: new FormControl(null, [Validators.required]),
    userPassword: new FormControl(null, [Validators.required]),
  });
  constructor(private router: Router,private userService: UserService) { 
    
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/home'])
  }

  auth(){
    console.log(this.loginForm.get('userEmail').value);

    this.userService.authenticate(this.loginForm.get('userEmail').value, this.loginForm.get('userPassword').value).subscribe((response) =>{
     //alert('Login Successful')
      this.router.navigate(['/userList'])
      debugger;
    },()=>{
      debugger;
      alert('Invalid credentials')
    })
  }

  get getUserFormRef() { return this.loginForm.controls }
}
