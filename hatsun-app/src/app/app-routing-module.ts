import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleViewComponent } from './sample/view/sample-view/sample-view.component';
import { UserMasterListComponent } from './user-master-list/user-master-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RoleMasterComponent } from './role-master/role-master.component';

const routes: Routes = [
  {
    path: 'home', component: SampleViewComponent
  },
  {
    path: 'sample', component: SampleViewComponent
  },
  {
    path: 'userList', component: UserMasterListComponent
  },
  {
    path: 'createUser/:id/:pageStatus', component: CreateUserComponent
  },
  {
    path: 'roleMaster', component: RoleMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

