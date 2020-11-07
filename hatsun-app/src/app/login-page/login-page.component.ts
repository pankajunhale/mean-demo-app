import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private router : Router) { 
    
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/home'])
  }

}
