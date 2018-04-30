import {Component, Inject, OnInit} from '@angular/core';
import {UserDataService} from "../../services/user-data.service";
import {MatDialog, MatDialogRef} from "@angular/material";
import {ChangeEmailComponent} from "../../modals/change-email/change-email.component";
import {ConfirmModel1Component} from "../../modals/confirm-model1/confirm-model1.component";
import {ChangeDateComponent} from "../../modals/change-date/change-date.component";
import {FormateDateService} from "../../services/formate-date.service";

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {
  bookingData; checkIn; checkOut;
  constructor(private userService: UserDataService,
              private format: FormateDateService,
              private dialog: MatDialog) {
    userService.findUser();
    this.findData();
  }

  ngOnInit() {
    console.log(this.userService.userData);
  }

  addChangeDialog() {
    this.dialog.open(ChangeEmailComponent, {
      data: this.userService.userData
    });
  }
  onCancelBooking() {
    this.dialog.open(ConfirmModel1Component);
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
