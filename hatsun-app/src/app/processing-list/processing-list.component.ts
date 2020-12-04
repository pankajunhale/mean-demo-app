import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processing-list',
  templateUrl: './processing-list.component.html',
  styleUrls: ['./processing-list.component.css']
})
export class ProcessingListComponent implements OnInit {
  interfaceTimeVal: string;

  constructor() { }

  ngOnInit() {
  }

  interfaceTime() {
    this.interfaceTimeVal = $("#interface-time").val().toString();
  }

}
