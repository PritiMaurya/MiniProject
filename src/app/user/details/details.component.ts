import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ManageHotelService} from "../../services/manage-hotel.service";
import {UserDataService} from "../../services/user-data.service";
import {HotelBookingComponent} from "../../modals/hotel-booking/hotel-booking.component";
import {MatDialog} from "@angular/material";
import {Alert1Component} from "../../modals/alert1/alert1.component";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  items; result; roomData; loading = false;
  userToken;
  constructor(private routs: ActivatedRoute,
              private hotelService: ManageHotelService,
              private userService: UserDataService,
              private dialog: MatDialog) {
    const id = +routs.snapshot.params['id'];
    this.userToken = localStorage.getItem('token');
    let res1, res2;
    console.log('id  ', id);
    userService.getHotelImg().subscribe(
      (res) => {
        res1 = res;
        res1.data.map(d => {
          if (id === d.hotelId) {
            this.result = d;
            console.log('result ', this.result);
          }
        });
      }
    );
    hotelService.displayHotelImages(id).subscribe(
      (res) => {
        this.items = res;
      }
    );
    userService.roomDetail(id).subscribe(
      (res) => {
         res2 = res;
        if (res2.error) {
          console.log(res2.message);
        } else {
          this.roomData = res2.data;
          console.log(this.roomData);
          this.loading = false;
        }
      }
    );
  }
  AddBookingForm() {
    // this.dialogService.addDialog(HotelBookingComponent, {hotelData: this.result});
    if (this.userToken) {
      this.dialog.open(HotelBookingComponent, {
        data: this.result
      });
    } else {
      this.dialog.open(Alert1Component, {
        data: {message: 'Please Login First'}
      });
    }
  }

  ngOnInit() {
    this.loading = true;
  }

}
