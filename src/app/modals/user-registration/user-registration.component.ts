import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
export interface RegisterModel {
  title: String;
}
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent extends DialogComponent<RegisterModel, null> implements RegisterModel{
  title: String
  constructor(dialogService: DialogService, private apiService: ApiService, private router: Router) {
    super(dialogService);
  }
  onRes(f) {
    console.log(f);
    this.apiService.signUpUser({}).subscribe(
      () => {

      }
    );
  }
}
