import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleViewComponent } from './sample/view/sample-view/sample-view.component';

const routes: Routes = [
  {
    path: 'home', component: SampleViewComponent
  },
  {
    path: 'sample', component: SampleViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

