import { Component } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import jwt = require('angular2-jwt-simple');
import {environment} from "../../config/environment";
import {MessageService} from "../../services/message.service";
import 'rxjs/add/operator/map';
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
  data;
  loading = false;
  constructor(dialogService: DialogService, private apiService: ApiService, private router: Router,
              private messageService: MessageService) {
    super(dialogService);
    apiService.errorMsg = false;
  }

  onLogin(f) {
    this.data = {email: f.value.email, password: f.value.password};
    this.loading = true;
    this.apiService.signIn(this.data).subscribe(
      (res) => {
        this.apiService.d = res;
        console.log(res);
        if (this.apiService.d.error) {
          this.apiService.errorMsg = true;
          this.loading = false;
        } else {
          this.apiService.errorMsg = false;
          const token = this.apiService.d.token;
          localStorage.setItem('token', token);
          const role = jwt.encode(this.apiService.d.role, environment.secret);
          localStorage.setItem('role', role);
          this.messageService.broadcast('receiver', {login: true});
          if (this.apiService.d.role === 'user') {
            this.loading = false;
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/admin/dashboard']);
          }
          this.apiService.blur = false;
          this.close();
        }
      }, (err) => {
        console.log('err');
        console.log(err);
      }
    );
  }

}
