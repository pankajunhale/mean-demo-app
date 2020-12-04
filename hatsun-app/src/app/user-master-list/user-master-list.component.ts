import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';
import { GeographyService } from '../services/geography.service';
import { RoleService } from '../services/role.service';
import { UserSelectionFilterModel } from '../model/user.model';

@Component({
  selector: 'app-user-master-list',
  templateUrl: './user-master-list.component.html',
  styleUrls: ['./user-master-list.component.css']
})
export class UserMasterListComponent implements OnInit {

  private IS_LOGGED_IN = 'isLoggedIn';
  userDataList: any;
  dtOptions: DataTables.Settings = {};
  countryDropdown: any;
  stateDropdown: any;
  districtDropdown: any;
  roleDropdown: any;
  userAutocomplete: any;
  UserSelectionFilter: UserSelectionFilterModel;
  keyword = 'UserName';
  UserId: String;

  constructor(private userlist: UserService,
    private commonService: CommonService,
    private geographyService: GeographyService,
    private roleService: RoleService) {
    this.UserSelectionFilter = new UserSelectionFilterModel();
    this.init();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      scrollX: true
    };
  }

  ngOnInit() {
    this.geographyService.findCountry().subscribe((response: any) => {
      this.countryDropdown = response.response;
    })

    this.roleService.findRolesDropdown().subscribe((response: any) => {
      this.roleDropdown = response.response;
    })

    this.userlist.findUsersDropdown().subscribe((response: any) => {
      debugger;
      this.userAutocomplete = response.response;
    })
  }

  selectEvent(item) {
    debugger;
    this.UserId = item._id;
  }

  findState() {
    debugger;
    let country = $("#country").val();
    this.geographyService.findState(country).subscribe((response: any) => {
      this.stateDropdown = response.response;
    })
  }

  findCity() {
    let state = $("#state").val();
    this.geographyService.findCity(state).subscribe((response: any) => {
      this.districtDropdown = response.response;
    })
  }

  public onSubmit() {
    debugger;
    var that = this;
    this.UserSelectionFilter.UserID = this.UserId;
    this.UserSelectionFilter.Country = $("#country").val().toString();
    this.UserSelectionFilter.State = $("#state").val().toString();
    this.UserSelectionFilter.Distrcit = $("#district").val().toString();
    this.UserSelectionFilter.IsActive = $("#status").val().toString();
    this.UserSelectionFilter.RoleID = $("#role").val().toString();

    this.userlist.findAllUsers(this.UserSelectionFilter).subscribe((response) => {
      console.log(response)
      this.userDataList = response;
    });
  }

  clear() {
    $("#country").val("");
    $("#state").val("");
    $("#district").val("");
    $("#status").val("");
    $("#role").val("");
    this.UserId = "";
  }

  private init() {
    if (!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/login', true);
    }
  }
}
