import {Component, Inject, OnInit} from '@angular/core';
import {UserDataService} from "../../services/user-data.service";
import {MatDialog, MatDialogRef} from "@angular/material";
import {ChangeEmailComponent} from "../../modals/change-email/change-email.component";
import {ConfirmModel1Component} from "../../modals/confirm-model1/confirm-model1.component";
import {ChangeDateComponent} from "../../modals/change-date/change-date.component";
import {FormateDateService} from "../../services/formate-date.service";
import {Alert1Component} from "../../modals/alert1/alert1.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {
  bookingData; checkIn; checkOut;
  constructor(private userService: UserDataService,
              private format: FormateDateService,
              private dialog: MatDialog,
              private router: Router) {
    userService.findUser();
    this.findData();
  }

  ngOnInit() {
    console.log(this.userService.userData);
    this.userService.changeDate.subscribe(s => {
      this.checkIn = s.checkIn;
      this.checkOut = s.checkOut;
    });
  }

  addChangeDialog() {
    this.dialog.open(ChangeEmailComponent, {
      data: this.userService.userData
    });
  }
  onCancelBooking() {
    let res1;
    const dialogRef = this.dialog.open(ConfirmModel1Component,
      {data: {title: 'Confirm Cancel Booking', message: 'Are you sure to cancel booking'}});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.userService.cancelBooking().subscribe(
            (res) => {
              res1 = res;
              this.dialog.open(Alert1Component, {data: {message: res1.message}});
              this.router.navigate(['/home']);
            });
        }
      }
    );
  }
  onChangeDate() {
    this.dialog.open(ChangeDateComponent);
    this.findData();
  }

  findData() {
    let res1;
    this.userService.findBookingData().subscribe(
      (res) => {
        res1 = res;
        this.bookingData = res1.data[0];
        this.checkIn = this.format.formatDate(new Date(this.bookingData.checkIn));
        this.checkOut = this.format.formatDate(new Date(this.bookingData.checkOut));
      }
    );
  }
}
