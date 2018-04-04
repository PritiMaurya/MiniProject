import { Component, OnInit } from '@angular/core';
import {DialogService} from 'ng2-bootstrap-modal';
import {LoginModalComponent} from '../../modals/login-modal/login-modal.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private dialogService: DialogService, private router: Router) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/adminHome']);
    } else {
      dialogService.addDialog(LoginModalComponent,  {title: 'Sign in'});
    }
  }

  ngOnInit() {
    // console.log('hello');
  }

}
