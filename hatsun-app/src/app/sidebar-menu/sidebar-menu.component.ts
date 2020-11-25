import { Component, OnInit, HostListener } from '@angular/core';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  MenuSelectionId: string;
  AnotherMenuSelectionId: string;
  MenuSetupList: any;
  
  constructor(private roleService: RoleService) {

   }

  ngOnInit() {
    this.roleService.findMenuSetup().subscribe((response: any) => {
      debugger;
      this.MenuSetupList = response.response;
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
    if(!$(event.target).hasClass("menu-link")) {
      this.MenuSelectionId = "0";
      this.AnotherMenuSelectionId = "0";
    }
  }
}
