import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminLoginComponent} from "../admin/admin-login/admin-login.component";
import {DashboardComponent} from "../admin/dashboard/dashboard.component";
import {HomeComponent} from "../home/home.component";
import {DisplayPlaceComponent} from "../admin/display-place/display-place.component";
import {AdminGuard} from "../guards/admin.guard";
import {AddImageComponent} from "../modals/place/add-image/add-image.component";
import {AddPlaceComponent} from "../modals/place/add-place/add-place.component";
import {HeaderComponent} from "../admin/header/header.component";
import {LeftPanelComponent} from "../admin/left-panel/left-panel.component";
import {AdminHomeComponent} from "../admin/admin-home/admin-home.component";
import {DashBodyComponent} from "../admin/dash-body/dash-body.component";
import {DisplayUserComponent} from "../admin/display-user/display-user.component";
import {ChangePasswordComponent} from "../admin/change-password/change-password.component";
import {AddHotelComponent} from "../modals/hotel/add-hotel/add-hotel.component";
import {DemoComponent} from "../demo/demo.component";
import {DisplayHotelsComponent} from "../admin/display-hotels/display-hotels.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'demo', component: DemoComponent},
  {path: 'admin', component: AdminLoginComponent},
  {path: 'admin/dashboard', component: DashBodyComponent, canActivate: [AdminGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'displayPlace', component: DisplayPlaceComponent, canActivate: [AdminGuard]},
  {path: 'addImage', component: AddImageComponent, canActivate: [AdminGuard]},
  {path: 'addPlace', component: AddPlaceComponent, canActivate: [AdminGuard]},
  {path: 'adminHeader', component: HeaderComponent, canActivate: [AdminGuard]},
  {path: 'adminLeftPane', component: LeftPanelComponent, canActivate: [AdminGuard]},
  {path: 'adminBody', component: DashboardComponent, canActivate: [AdminGuard]},
  {path: 'adminHome', component: AdminHomeComponent, canActivate: [AdminGuard]},
  {path: 'displayUser', component: DisplayUserComponent, canActivate: [AdminGuard]},
  {path: 'changePass', component: ChangePasswordComponent, canActivate: [AdminGuard]},
  {path: 'addHotel', component: AddHotelComponent, canActivate: [AdminGuard]},
  {path: 'displayHotel', component: DisplayHotelsComponent, canActivate: [AdminGuard]}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})

export class RoutesModule { }
