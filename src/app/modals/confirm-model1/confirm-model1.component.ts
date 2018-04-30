import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Alert1Component} from "../alert1/alert1.component";
import {UserDataService} from "../../services/user-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-model1',
  templateUrl: './confirm-model1.component.html',
  styleUrls: ['./confirm-model1.component.css']
})
export class ConfirmModel1Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Alert1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserDataService,
    private dialog: MatDialog,
    private router: Router) {}
  ngOnInit() {
  }

  onClickYes() {
    let res1;
    this.userService.cancelBooking().subscribe(
      (res) => {
        res1 = res;
        this.dialogRef.close();
        this.dialog.open(Alert1Component, {data: {message: res1.message}});
        this.router.navigate(['/home']);
      }
    );
  }
}
