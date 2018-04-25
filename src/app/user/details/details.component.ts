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
  items; result;
  constructor(private routs: ActivatedRoute, private hotelService: ManageHotelService, private userService: UserDataService) {
    const id = +routs.snapshot.params['id'];
    let res1;
    this.userService.getHotelImg().subscribe(
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
  }

  ngOnInit() {
  }

}
