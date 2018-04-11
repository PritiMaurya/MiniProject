import { Component, OnInit } from '@angular/core';
import {DialogService} from "ng2-bootstrap-modal";
import {LoginModalComponent} from "../../modals/login-modal/login-modal.component";
import {UserRegistrationComponent} from "../../modals/user-registration/user-registration.component";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  addSignIn() {
    this.dialogService.addDialog(LoginModalComponent);
  }

  addSignUp() {
    this.dialogService.addDialog(UserRegistrationComponent);
  }

}
