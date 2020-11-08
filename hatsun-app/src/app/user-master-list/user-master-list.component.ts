import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-master-list',
  templateUrl: './user-master-list.component.html',
  styleUrls: ['./user-master-list.component.css']
})
export class UserMasterListComponent implements OnInit {
  userDataList: any;
  dtOptions: DataTables.Settings = {};
  constructor(private userlist: UserService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true
    };
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.userlist.findAllUsers().subscribe((response) => {
      this.userDataList = response;
    });
  }
}
