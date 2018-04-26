import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ManageHotelService} from "../../services/manage-hotel.service";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  items; result; roomData;
  constructor(private routs: ActivatedRoute, private hotelService: ManageHotelService, private userService: UserDataService) {
    const id = +routs.snapshot.params['id'];
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
        }
      }
    );
  }

  ngOnInit() {
  }

}
