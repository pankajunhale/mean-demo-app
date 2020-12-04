import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-interface',
  templateUrl: './create-interface.component.html',
  styleUrls: ['./create-interface.component.css']
})
export class CreateInterfaceComponent implements OnInit {
  emailCart = []
  constructor() { }
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  ngOnInit() {
  }

  addEmail() {
    this.emailCart.push($("#user-email").val());
    $("#user-email").val("");
  }

  removeEmail(userEmail) {
    this.emailCart.splice(userEmail, 1);
  }
}
