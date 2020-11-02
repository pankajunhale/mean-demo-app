import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SampleService } from './services/sample.service';
import { AppRoutingModule } from './app-routing-module';
import { SampleViewComponent } from './sample/view/sample-view/sample-view.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleViewComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SampleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
