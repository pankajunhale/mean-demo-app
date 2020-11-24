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
  MenuList = [
    {
      GroupMenu: "User Managment",
      GroupId:"1",
      ParentMenu: [
        {
          ParentMenu: "User Master",
          ParentId: "1",
          ChieldMenu: [
            {
              ChieldMenu: "User List",
              ChieldId: "1",
              link: "/userList"
            }
          ]
        },
        {
          ParentMenu: "Role Master",
          ParentId: "2",
          ChieldMenu: [
            {
              ChieldMenu: "Role List",
              ChieldId: "1",
              link: "/roleMaster"
            }
          ]
        },
        {
          ParentMenu: "Role Assignment",
          ParentId: "3",
          ChieldMenu: [
            {
              ChieldMenu: "Assignment List",
              ChieldId: "1",
              link: "/roleAccessRelation"
            }
          ]
        }
      ]
    },
    {
      GroupMenu: "Partners",
      GroupId: "2",
      ParentMenu: [
        {
          ParentMenu: "Customers",
          ParentId: "1",
          ChieldMenu: [
            {
              ChieldMenu: "Customer List",
              ChieldId: "1",
              link: "/customerList"
            }
          ]
        }
      ]
    },
    {
      GroupMenu: "Reports",
      GroupId: "3",
      ParentMenu: [
        {
          ParentMenu: "Dashboard",
          ParentId: "1",
          ChieldMenu: [
            {
              ChieldMenu: "Dashboard Page",
              ChieldId: "1",
              link: "/#"
            }
          ]
        },
        {
          ParentMenu: "Processing List",
          ParentId: "2",
          ChieldMenu: [
            {
              ChieldMenu: "Error List",
              ChieldId: "2",
              link: "/#"
            }
          ]
        }
      ]
    },
    {
      GroupMenu: "Setup",
      GroupId: "4",
      ParentMenu: [
        {
          ParentMenu: "Interface",
          ParentId: "1",
          ChieldMenu: [
            {
              ChieldMenu: "Interface List",
              ChieldId: "1",
              link: "/#"
            }
          ]
        },
        {
          ParentMenu: "File Location",
          ParentId: "2",
          ChieldMenu: [
            {
              ChieldMenu: "Source Location",
              ChieldId: "1",
              link: "/#"
            },
            {
              ChieldMenu: "Target Location",
              ChieldId: "2",
              link: "/#"
            }
          ]
        },
        {
          ParentMenu: "File Mapping",
          ParentId: "3",
          ChieldMenu: [
            {
              ChieldMenu: "File List",
              ChieldId: "1",
              link: "/#"
            }
          ]
        },
        {
          ParentMenu: "Batch Jobs",
          ParentId: "4",
          ChieldMenu: [
            {
              ChieldMenu: "Batch Job List",
              ChieldId: "1",
              link: "/#"
            },
            {
              ChieldMenu: "Batch Job Processing",
              ChieldId: "2",
              link: "/#"
            }
          ]
        }
      ]
    }
  ]
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
