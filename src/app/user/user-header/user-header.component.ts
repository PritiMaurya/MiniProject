import { Component, OnInit } from '@angular/core';
import {DialogService} from "ng2-bootstrap-modal";
import {LoginModalComponent} from "../../modals/login-modal/login-modal.component";
import {UserRegistrationComponent} from "../../modals/user-registration/user-registration.component";
import jwt = require('angular2-jwt-simple');
import {environment} from "../../config/environment";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  token; role;
  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.role = jwt.decode(localStorage.getItem('role'), environment.secret);
  }

  addSignIn() {
    this.dialogService.addDialog(LoginModalComponent);
  }

  addSignUp() {
    this.dialogService.addDialog(UserRegistrationComponent);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.token = null;
    this.role = null;
  }

}
