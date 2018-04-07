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

  constructor(private dialogService: DialogService, private router: Router, private apiService: ApiService) {
  }

  ngOnInit() {
    // console.log('hello');
    if (this.apiService.token != null) {
      this.router.navigate(['/adminHome']);
    } else {
      this.dialogService.addDialog(LoginModalComponent,  {title: 'Sign in'});
    }
  }

}
