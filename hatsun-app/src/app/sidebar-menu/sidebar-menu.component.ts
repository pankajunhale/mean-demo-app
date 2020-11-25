import { Component, OnInit, HostListener } from '@angular/core';
import { RoleService } from '../services/role.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  MenuSelectionId: string;
  AnotherMenuSelectionId: string;
  MenuSetupList: any;
  roleID: string;

  constructor(private roleService: RoleService, private commonService: CommonService) {

  }

  ngOnInit() {
    this.roleID = this.commonService.getLocalStorageItem("roleId");
    this.roleService.findMenuSetup(this.roleID).subscribe((response: any) => {
      debugger;
      this.MenuSetupList = response.response;
      console.log("Role Id - " + this.roleID);
    })
  }


  level1Click(leve1Menu) {
    debugger;
    this.MenuSelectionId = leve1Menu;
  }

  level2Click(level2Menu) {
    this.AnotherMenuSelectionId = level2Menu;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!$(event.target).hasClass("menu-link")) {
      this.MenuSelectionId = "0";
      this.AnotherMenuSelectionId = "0";
    }
  }
}
