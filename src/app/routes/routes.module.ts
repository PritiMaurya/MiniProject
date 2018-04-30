import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminLoginComponent} from "../admin/admin-login/admin-login.component";
import {DashboardComponent} from "../admin/dashboard/dashboard.component";
import {HomeComponent} from "../home/home.component";
import {DisplayPlaceComponent} from "../admin/display-place/display-place.component";
import {AddImageComponent} from "../modals/place/add-image/add-image.component";
import {AddPlaceComponent} from "../modals/place/add-place/add-place.component";
import {HeaderComponent} from "../admin/header/header.component";
import {LeftPanelComponent} from "../admin/left-panel/left-panel.component";
import {AdminHomeComponent} from "../admin/admin-home/admin-home.component";
import {DisplayUserComponent} from "../admin/display-user/display-user.component";
import {ChangePasswordComponent} from "../admin/change-password/change-password.component";
import {AddHotelComponent} from "../modals/hotel/add-hotel/add-hotel.component";
import {DemoComponent} from "../demo/demo.component";
import {DisplayHotelsComponent} from "../admin/display-hotels/display-hotels.component";
import {DiplayImagesComponent} from "../modals/diplay-images/diplay-images.component";
import {UnauthComponent} from "../unauth/unauth.component";
import {DetailsComponent} from "../user/details/details.component";
import {RoleGuard} from "../guards/role.guard";
import {BookingPageComponent} from "../user/booking-page/booking-page.component";

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'detail/:id', component: DetailsComponent},
  {path: 'demo', component: DemoComponent},
  {path: 'login', component: AdminLoginComponent},
  {path: 'admin/dashboard', component: AdminHomeComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'displayPlace', component: DisplayPlaceComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'addImage', component: AddImageComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'addPlace', component: AddPlaceComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'adminHeader', component: HeaderComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'adminLeftPane', component: LeftPanelComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'adminBody', component: DashboardComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'adminHome', component: AdminHomeComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'displayUser', component: DisplayUserComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'changePass', component: ChangePasswordComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'addHotel', component: AddHotelComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'displayHotel', component: DisplayHotelsComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'displayPlaceImage', component: DiplayImagesComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  {path: 'confirmBooking', component: BookingPageComponent, canActivate: [RoleGuard], data: {expectedRole: 'user'}},
  {path: 'notAccess', component: UnauthComponent}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})

export class RoutesModule { }
