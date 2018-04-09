import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {RoutesModule} from './routes/routes.module';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { HeaderComponent } from './admin/header/header.component';
import { DashBodyComponent } from './admin/dash-body/dash-body.component';
import { HomeComponent } from './home/home.component';
import { UserHeaderComponent } from './user/user-header/user-header.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import {ApiService} from './services/api.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UserRegistrationComponent } from './modals/user-registration/user-registration.component';
import { AddPlaceComponent } from './modals/place/add-place/add-place.component';
import { AddImageComponent } from './modals/place/add-image/add-image.component';
import { DisplayPlaceComponent } from './admin/display-place/display-place.component';
import { PromptModalComponent } from './modals/prompt-modal/prompt-modal.component';
import { AlertModalComponent } from './modals/alert-modal/alert-modal.component';
import {AdminGuard} from './guards/admin.guard';
import { LeftPanelComponent } from './admin/left-panel/left-panel.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { DiplayImagesComponent } from './modals/diplay-images/diplay-images.component';
import { DisplayUserComponent } from './admin/display-user/display-user.component';
import {MyInterceptor} from "./interceptors/my-interceptor";
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { DisplayHotelsComponent } from './admin/display-hotels/display-hotels.component';
import { AddHotelComponent } from './modals/hotel/add-hotel/add-hotel.component';



@NgModule({
  declarations: [
    AppComponent,
    ConfirmModalComponent,
    DashboardComponent,
    AdminLoginComponent,
    HeaderComponent,
    DashBodyComponent,
    HomeComponent,
    UserHeaderComponent,
    LoginModalComponent,
    UserRegistrationComponent,
    AddPlaceComponent,
    AddImageComponent,
    DisplayPlaceComponent,
    PromptModalComponent,
    AlertModalComponent,
    LeftPanelComponent,
    AdminHomeComponent,
    DiplayImagesComponent,
    DisplayUserComponent,
    ChangePasswordComponent,
    DisplayHotelsComponent,
    AddHotelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule,
    BootstrapModalModule.forRoot({container: document.body}),
    RoutesModule,
    HttpClientModule
  ],
  entryComponents: [
    ConfirmModalComponent,
    LoginModalComponent,
    AddPlaceComponent,
    AddImageComponent,
    AlertModalComponent,
    PromptModalComponent,
    DiplayImagesComponent
  ],
  providers: [ApiService, AdminGuard,  {
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
