import { Component, OnInit } from '@angular/core';
import {LoginModalComponent} from '../../modals/login-modal/login-modal.component';
import {Router} from '@angular/router';
import {environment} from '../../config/environment';
import jwt = require('angular2-jwt-simple');
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  token; role;
  constructor(private dialog: MatDialog , private router: Router) {
    this.token = localStorage.getItem('token');
    if (localStorage.getItem('role')) {
      this.role = jwt.decode(localStorage.getItem('role'), environment.secret);
    }
    this.openDialog();
  }

  ngOnInit() {
    // console.log('hello');
  }
  openDialog() {
    if (this.token === null) {
      this.dialog.open(LoginModalComponent, { width: '400px'});
    } else {
      if (this.role === 'user') {
        this.router.navigate(['/']);
      } else if (this.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      }
    }
  }
}
