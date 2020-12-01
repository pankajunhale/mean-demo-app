import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-master-list',
  templateUrl: './user-master-list.component.html',
  styleUrls: ['./user-master-list.component.css']
})
export class UserMasterListComponent implements OnInit {

  private IS_LOGGED_IN = 'isLoggedIn';
  userDataList: any;
  dtOptions: DataTables.Settings = {};
  constructor(private userlist: UserService, private commonService: CommonService) {
    this.init();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      scrollX: true
    };
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.userlist.findAllUsers().subscribe((response) => {
      debugger;
      console.log(response)
      this.userDataList = response;
    });
  }

  private init(){
    if(!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)){
      this.commonService.redirectToPath('/login',true);
    }
  }
}
