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
import { DemoComponent } from './demo/demo.component';
import { AddHotelImgComponent } from './modals/hotel/add-hotel-img/add-hotel-img.component';
import { ChangeTextDirective } from './change-text.directive';
import {ManageHotelService} from "./services/manage-hotel.service";
import { DisplayImgComponent } from './modals/hotel/display-img/display-img.component';
import { DashboardChartComponent } from './admin/dashboard-chart/dashboard-chart.component';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import {FusionChartsModule} from 'angular4-fusioncharts';
import { AddRoomComponent } from './modals/hotel/add-room/add-room.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { UnauthComponent } from './unauth/unauth.component';
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import { UserBodyComponent } from './user/user-body/user-body.component';
import {UserDataService} from "./services/user-data.service";
import { DetailsComponent } from './user/details/details.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import {AuthService} from "./services/auth.service";
import {RoleGuard} from "./guards/role.guard";


FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);


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
    AddHotelComponent,
    DemoComponent,
    AddHotelImgComponent,
    ChangeTextDirective,
    DisplayImgComponent,
    DashboardChartComponent,
    AddRoomComponent,
    UnauthComponent,
    UserBodyComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule,
    BootstrapModalModule.forRoot({container: document.body}),
    RoutesModule,
    HttpClientModule,
    FusionChartsModule,
    Ng2SearchPipeModule,
    AngularMultiSelectModule,
    Ng2CarouselamosModule
  ],
  entryComponents: [
    ConfirmModalComponent,
    LoginModalComponent,
    AddPlaceComponent,
    AddImageComponent,
    AlertModalComponent,
    PromptModalComponent,
    DiplayImagesComponent,
    UserRegistrationComponent,
    AddHotelImgComponent,
    DisplayImgComponent,
    AddRoomComponent
  ],
  providers: [ApiService, AuthService, ManageHotelService, UserDataService, AdminGuard, RoleGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
