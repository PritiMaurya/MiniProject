import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {UserDataService} from "../../services/user-data.service";
import {Alert1Component} from "../alert1/alert1.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangeEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserDataService,
    private router: Router,
    private dialog: MatDialog) {}
  ngOnInit() {
  }
  changeEmail(email) {
    let res1;
    this.userService.changeEmail({email: email}).subscribe(
      (res) => {
        res1 = res;
        this.dialog.open(Alert1Component, { data: {message: res1.message}});
        this.dialogRef.close();
        this.dialogRef.afterClosed().subscribe(
          (data) => {
              this.userService.findUser();
              this.router.navigate(['/confirmBooking']);
          }
        );
      }
    );
  }

}
