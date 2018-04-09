import { Component, OnInit } from '@angular/core';
import {DialogService} from "ng2-bootstrap-modal";
import {AlertModalComponent} from "../../modals/alert-modal/alert-modal.component";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private dialogService: DialogService, private apiService: ApiService) { }

  ngOnInit() {
  }

  onClickChange(f) {
    // console.log({password: f.value.oldPass, newPass: f.value.newPass1});
    let res1;
    if (f.value.newPass1 !== f.value.newPass2) {
        this.dialogService.addDialog(AlertModalComponent, {message: 'New password and Confirm password should be match'});
    } else {
      this.apiService.changePassword({password: f.value.oldPass, newPass: f.value.newPass1}).subscribe(
        (res) => {
            res1 = res;
            if (res1.error) {
              this.dialogService.addDialog(AlertModalComponent, {message: res1.message});
            } else {
              this.dialogService.addDialog(AlertModalComponent, {message: res1.message});
            }
        }
      );
      f.reset();
    }
  }

}
