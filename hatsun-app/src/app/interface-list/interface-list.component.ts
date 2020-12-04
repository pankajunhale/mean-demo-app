import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interface-list',
  templateUrl: './interface-list.component.html',
  styleUrls: ['./interface-list.component.css']
})
export class InterfaceListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor() { 
    this.dtOptions = {
      processing: true,
      scrollX: true
    };
  }

  ngOnInit() {
  }

}
