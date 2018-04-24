import { Component, OnInit } from '@angular/core';
import {DialogService} from 'ng2-bootstrap-modal';
import {LoginModalComponent} from '../../modals/login-modal/login-modal.component';
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  token;
  constructor(private dialogService: DialogService, private router: Router, private apiService: ApiService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    // console.log('hello');
    if (this.token === null) {
      this.dialogService.addDialog(LoginModalComponent,  {title: 'Sign in'});
    } else {
      this.router.navigate(['/admin/dashboard']);
    }
  }

}
