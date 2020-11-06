import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleViewComponent } from './sample/view/sample-view/sample-view.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MasterPageComponent } from './master-page/master-page.component';

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

