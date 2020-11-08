import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  MenuSelectionId: string;
  AnotherMenuSelectionId: string;
  MenuList = [
    {
      GroupMenu: "Sales",
      GroupId:"1",
      ParentMenu: [
        {
          ParentMenu: "Sales Order",
          ParentId: "1",
          ChieldMenu: [
            {
              ChieldMenu: "Create SalesOrder",
              ChieldId: "1",
            },
            {
              ChieldMenu: "Sales Order List",
              ChieldId: "2",
            }
          ]
        },
        {
          ParentMenu: "Delivery Order",
          ParentId: "2",
          ChieldMenu: [
            {
              ChieldMenu: "Create Delivery",
              ChieldId: "1",
            },
            {
              ChieldMenu: "Delivery List",
              ChieldId: "2",
            }
          ]
        }
      ]
    },
    {
      GroupMenu: "Purchase",
      GroupId: "2",
      ParentMenu: [
        {
          ParentMenu: "Purchase Order",
          ParentId: "2",
          ChieldMenu: [
            {
              ChieldMenu: "Create Purchase Order",
              ChieldId: "1",
            },
            {
              ChieldMenu: "Purchase Order List",
              ChieldId: "2",
            }
          ]
        }
      ]
    }
  ]
  constructor() { }

  ngOnInit() {
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
