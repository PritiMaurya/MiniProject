import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {AlertModalComponent} from '../alert-modal/alert-modal.component';
import jwt = require('angular2-jwt-simple');
import { environment } from '../../config/environment';

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
    let res1;
    this.apiService.signUpUser({name: f.value.name, email: f.value.email, password: f.value.pass, mobile: f.value.mobile, role: 'user'})
      .subscribe(
      (res) => {
        res1 = res;
        if (res1.error) {
          this.dialogService.addDialog(AlertModalComponent, {message: 'Email is already used please try again'});
          f.reset();
        } else {
          console.log(res);
          localStorage.setItem('token', res1.token);
          const role = jwt.encode(res1.token, environment.secret);
          localStorage.setItem('role', role);
          this.dialogService.addDialog(AlertModalComponent, {message: 'Registration Successful'});
          this.close();
          this.router.navigate(['/home']);
          f.reset();
        }
      }
    );
  }
}
