import { Component, OnInit } from '@angular/core';
import { SampleModel } from 'src/app/model/sample.model';
import { SampleService } from 'src/app/services/sample.service';

@Component({
  selector: 'app-sample-view',
  templateUrl: './sample-view.component.html',
  styleUrls: ['./sample-view.component.css']
})
export class SampleViewComponent implements OnInit {
  sampleDataViewModel: SampleModel = null;
  constructor(private sampleDataService: SampleService) {
   }

  ngOnInit() {
  }

  public onSubmit(){
     this.sampleDataService.findAllUsers().subscribe((response)=>{
       debugger;
      console.log(response);
    });
  }

}
