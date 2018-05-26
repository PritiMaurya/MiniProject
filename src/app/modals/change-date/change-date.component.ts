import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormateDateService} from '../../services/formate-date.service';
import {UserDataService} from '../../services/user-data.service';
import {Router} from '@angular/router';
import {Alert1Component} from '../alert1/alert1.component';

@Component({
  selector: 'app-change-date',
  templateUrl: './change-date.component.html',
  styleUrls: ['./change-date.component.css']
})
export class ChangeDateComponent implements OnInit {
  minDate; minDate1;
  date = new Date();
  y = this.date.getFullYear();
  mm = this.date.getMonth();
  d = this.date.getDate();
  bookingData; checkInDate;
  checkOutDate;
  constructor(
    public dialogRef: MatDialogRef<ChangeDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formatDate: FormateDateService,
    private userService: UserDataService,
    private dialog: MatDialog,
    private router: Router) {
    this.minDate =  new Date(this.y, this.mm, this.d);
  }

  ngOnInit() {
    let res1;
    this.userService.findBookingData().subscribe(
      (res) => {
        console.log('res of booking Data');
        res1 = res;
        this.bookingData = res1.data[0];
        this.checkInDate = new Date(this.bookingData.checkIn);
        this.checkOutDate = new Date(this.bookingData.checkOut);
        console.log(this.checkInDate, ' ', this.checkOutDate);
      }
    );
  }

  changeDate(date) {
    const newDate = this.formatDate.formatDate1(new Date(date));
    this.minDate1 = new Date(newDate[0], newDate[1], newDate[2]);
  }
  updateDate() {
    let res1;
    this.userService.updateDate(
      {checkIn: this.formatDate.formatDate(this.checkInDate), checkOut: this.formatDate.formatDate(this.checkOutDate)})
      .subscribe(
        (res) => {
          res1 = res;
          this.dialog.open(Alert1Component, {data: {message: res1.message}});
          this.userService.changeDate.next(
            {checkIn: this.formatDate.formatDate(this.checkInDate), checkOut: this.formatDate.formatDate(this.checkOutDate)});
          // this.bookingCom.findData();
          this.router.navigate(['/confirmBooking']);
          this.dialogRef.close();
        }
      );
  }
}
