import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
interface BookingModel {
  hotelData;
}
@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.css']
})
export class HotelBookingComponent extends DialogComponent<BookingModel, null> implements OnInit, BookingModel {
  hotelData; image;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    console.log(this.hotelData);
    this.image = 'http://localhost:3003/static/' + this.hotelData.imageName ;
    console.log(this.image);
  }

}
