import {Component} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import jwt = require('angular2-jwt-simple');
import {environment} from "../../config/environment";
import {MessageService} from "../../services/message.service";
import 'rxjs/add/operator/map';
import {UserDataService} from "../../services/user-data.service";
import {MatDialog, MatDialogRef} from "@angular/material";
import {Alert1Component} from "../alert1/alert1.component";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent  {
  title: String;
  role: String;
  data;
  loading = false;
  constructor(private apiService: ApiService,
              private userService: UserDataService,
              private router: Router,
              private messageService: MessageService,
              public dialogRef: MatDialogRef<LoginModalComponent>,
              private dialog: MatDialog) {
    apiService.errorMsg = false;
  }

  onLogin(f) {
    let res2;
    this.data = {email: f.value.email, password: f.value.password};
    this.loading = true;
    this.apiService.signIn(this.data).subscribe(
      (res) => {
        this.apiService.d = res;
        if (this.apiService.d.error) {
          this.loading = false;
          console.log('ssss')
          this.dialog.open(Alert1Component, {data: {message: 'Invalid Username or Password'}});
        } else {
          const token = this.apiService.d.token;
          localStorage.setItem('token', token);
          const role = jwt.encode(this.apiService.d.role, environment.secret);
          localStorage.setItem('role', role);
          this.messageService.broadcast('receiver', {login: true});
          if (this.apiService.d.role === 'user') {
            this.loading = false;
            this.userService.findBookingData().subscribe(
              (res1) => {
                  res2 = res1;
                  if (res2.data.length) {
                    this.router.navigate(['/confirmBooking']);
                  } else {
                    this.router.navigate(['/home']);
                  }
              }
            );
          } else {
            this.router.navigate(['/admin/dashboard']);
          }
           this.dialogRef.close();
        }
      }, (err) => {
        console.log('err');
        console.log(err);
      }
    );
  }
}
