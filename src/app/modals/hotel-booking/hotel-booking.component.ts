import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormateDateService} from "../../services/formate-date.service";
import {UserDataService} from "../../services/user-data.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.css']
})
export class HotelBookingComponent implements OnInit {
   image;
   minDate;
   date = new Date();
  y = this.date.getFullYear();
  mm = this.date.getMonth();
  d = this.date.getDate();
  minDate1;
  constructor(
    public dialogRef: MatDialogRef<HotelBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formatDate: FormateDateService,
    private userService: UserDataService,
    private router: Router) {
    this.image = 'http://localhost:3003/static/' + this.data.imageName ;
    this.minDate =  new Date(this.y, this.mm, this.d);
  }

  ngOnInit() {
    this.userService.findUser();
  }

  changeDate(date) {
    const newDate = this.formatDate.formatDate1(new Date(date));
    this.minDate1 = new Date(newDate[0], newDate[1], newDate[2]);
  }

  addData(f) {
    let res1;
    const inDate = this.formatDate.formatDate(f.value.inDate);
    const outDate = this.formatDate.formatDate(f.value.outDate);
    this.userService.bookRoom(
      {checkIn: inDate, checkOut: outDate, adult: f.value.adult, child: f.value.child, request: f.value.request, totRoom: f.value.totRoom})
      .subscribe(
      (res) => {
        console.log('res', res);
        res1 = res;
        if (res1.error) {
            console.log(res1.message);
        } else {
          this.dialogRef.close();
          this.router.navigate(['/confirmBooking']);
        }
      }
    );
  }
}
