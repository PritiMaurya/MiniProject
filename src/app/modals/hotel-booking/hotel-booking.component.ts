import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormateDateService} from "../../services/formate-date.service";
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
    private formatDate: FormateDateService) {
    this.image = 'http://localhost:3003/static/' + this.data.imageName ;
    this.minDate =  new Date(this.y, this.mm, this.d);
    this.minDate1 = new Date(this.y, this.mm, this.d + 1);
  }

  ngOnInit() {
  }


  addData(f) {
    const date = f.value.inDate;
    console.log('service');
    console.log(this.formatDate.formatDate(date));
    this.dialogRef.close();
  }
}
