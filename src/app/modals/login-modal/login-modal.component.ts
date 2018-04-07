import { Component } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

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
  constructor(dialogService: DialogService, private apiService: ApiService, private router: Router) {
    super(dialogService);
  }

  onLogin(f) {
    const data = {email: f.value.email, password: f.value.password};
    this.apiService.signIn(data).subscribe(
      (res) => {
        this.apiService.d = res;
        console.log(res);
        if (this.apiService.d.error) {
          this.apiService.errorMsg = true;
          localStorage.setItem('login', 'false');
        } else {
          this.apiService.errorMsg = false;
          console.log(this.apiService.d.token);
          const token = this.apiService.d.token;
          localStorage.setItem('token', token);
          localStorage.setItem('login', 'true');
          if (this.apiService.d.role === 'user') {
            this.router.navigate(['/home']);
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
