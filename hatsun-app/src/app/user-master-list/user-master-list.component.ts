import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-master-list',
  templateUrl: './user-master-list.component.html',
  styleUrls: ['./user-master-list.component.css']
})
export class UserMasterListComponent implements OnInit {
  userDataList: any;
  constructor(private userlist:UserService) { }

  ngOnInit() {
  }
  
  public onSubmit() {
    this.userlist.findAllUsers().subscribe((response) => {
      debugger;
      console.log(response);
      this.userDataList = response;
      console.log(this.userDataList);
    });
  }

}
