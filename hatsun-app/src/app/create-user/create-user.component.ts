import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../model/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute , Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { GeographyService } from '../services/geography.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  $userCreated = new BehaviorSubject(false);
  userName:string;
  userModel: UserModel = null;
  individualResponse: any;
  urlRequest: any;
  roleDropdown: any;
  countryDropdown: any;
  stateDropdown: any;
  districtDropdown: any;
  private emailRegEx = '^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$'
  userForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    userEmail: new FormControl(null, [Validators.required, Validators.pattern(this.emailRegEx)]),
    userCountry: new FormControl(null, [Validators.required]),
    userState: new FormControl(null, [Validators.required]),
    userDistrict: new FormControl(null, [Validators.required]),
    userLocation: new FormControl(null, [Validators.required]),
    userMobile: new FormControl(null),
    userPassword: new FormControl(null),
    userRole: new FormControl(null),
    userIsActive: new FormControl(null),
  });
  constructor(private userService: UserService,
    private route : Router,
    private location: Location,  
    private router: ActivatedRoute, 
    private roleService: RoleService,
    private geographyService: GeographyService) {
    this.userModel = new UserModel();
    this.router.params.subscribe(params => {
      this.urlRequest = params;
    })
   }

  ngOnInit() {
    if(this.urlRequest.pageStatus == 'view'){
      this.userForm.disable();
    }
    if (this.urlRequest.pageStatus != 'create' ){
      debugger;
      this.userService.getIndividualRecord(this.urlRequest.id).subscribe((response: any) => {
        debugger;
        this.individualResponse = response;
        this.userModel = this.individualResponse.response;
        this.findState();
        this.findCity();
      })
    }
    this.roleService.findAllRoles().subscribe((response: any) => {
      this.roleDropdown = response.response;
    })

    this.geographyService.findCountry().subscribe((response: any) => {
      this.countryDropdown = response.response;
    })
  }

  submit() {
    debugger;
    this.userService.submitUser(this.userModel).subscribe((response: any) => {
      debugger;
      alert(response.success);
      //this.$userCreated.next(true);
      this.route.navigateByUrl('/userLists')      
    })
  }

  update() {
    debugger;
    this.userService.updateUser(this.userModel, this.urlRequest.id).subscribe((response: any) => {
      alert(response.success);
    })
  }

  get getUserFormRef() { return this.userForm.controls }

  findState() {
    debugger;
    this.geographyService.findState(this.userModel.Country).subscribe((response: any) => {
      this.stateDropdown = response.response;
    })
  }

  findCity() {
    this.geographyService.findCity(this.userModel.State).subscribe((response: any) => {
      this.districtDropdown = response.response;
    })
  }

}
