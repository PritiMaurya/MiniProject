import { Component, OnInit } from '@angular/core';
import {DialogService} from 'ng2-bootstrap-modal';
import {LoginModalComponent} from '../../modals/login-modal/login-modal.component';
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {environment} from "../../config/environment";
import jwt = require('angular2-jwt-simple');

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  token; role;
  constructor(private dialogService: DialogService, private router: Router, private apiService: ApiService) {
    this.token = localStorage.getItem('token');
    if (localStorage.getItem('role')) {
      this.role = jwt.decode(localStorage.getItem('role'), environment.secret);
    }
  }

  ngOnInit() {
    // console.log('hello');
    if (this.token === null) {
      this.dialogService.addDialog(LoginModalComponent,  {title: 'Sign in'});
    } else {
      if (this.role === 'user') {
        this.router.navigate(['/']);
      } else if (this.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      }
    }
  }

}
