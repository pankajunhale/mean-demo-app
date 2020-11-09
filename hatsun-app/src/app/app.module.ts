import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SampleService } from './services/sample.service';
import { AppRoutingModule } from './app-routing-module';
import { SampleViewComponent } from './sample/view/sample-view/sample-view.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { HeaderComponent } from './header/header.component';
import { DataTablesModule } from 'angular-datatables';
import { MasterPageComponent } from './master-page/master-page.component';
import { UserMasterListComponent } from './user-master-list/user-master-list.component';
import { UserService } from './services/user.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleMasterComponent } from './role-master/role-master.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleViewComponent,
    LoginPageComponent,
    SidebarMenuComponent,
    HeaderComponent,
    MasterPageComponent,
    UserMasterListComponent,
    CreateUserComponent,
    RoleMasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [SampleService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
