import { Component } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import jwt = require('angular2-jwt-simple');
import {environment} from "../../config/environment";

export interface LoginModal {
  title: String;
}
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent extends DialogComponent<LoginModal, null> implements LoginModal {
  title: String;
  role: String;
  constructor(dialogService: DialogService, private apiService: ApiService, private router: Router) {
    super(dialogService);
    apiService.errorMsg = false;
  }

  onLogin(f) {
    const data = {email: f.value.email, password: f.value.password};
    this.apiService.signIn(data).subscribe(
      (res) => {
        this.apiService.d = res;
        console.log(res);
        if (this.apiService.d.error) {
          this.apiService.errorMsg = true;
        } else {
          this.apiService.errorMsg = false;
          const token = this.apiService.d.token;
          localStorage.setItem('token', token);
          const role = jwt.encode(this.apiService.d.role, environment.secret);
          localStorage.setItem('role', role);
          if (this.apiService.d.role === 'user') {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/admin/dashboard']);
          }
          this.close();
        }
      }, (err) => {
        console.log('err');
        console.log(err);
      }
    );
  }
}
