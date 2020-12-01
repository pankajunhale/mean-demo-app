import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {
  showMenu = true;
  clickEventSubscription : Subscription;
  isUserLoggedIn = 0;
  private IS_LOGGED_IN = 'isLoggedIn';
  constructor(private commonService: CommonService) {
    this.init();
    this.clickEventSubscription = this.commonService.getClickEvent().subscribe(()=> {
        this.showMenu = !this.showMenu;
    })
  }
  ngOnInit() {
  }

  private init() {
    const data = this.commonService.getLocalStorageItem(this.IS_LOGGED_IN);
    if (data) {
      this.isUserLoggedIn = parseInt(data);
    }
  }

}
