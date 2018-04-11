import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../config/environment';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
export interface AddHotelModel {
  title: String;
  placeId;
}

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent extends DialogComponent<AddHotelModel, null> implements OnInit, AddHotelModel{
  title: String;
  placeId;
  constructor(private http: HttpClient, public dialogService: DialogService) {
    super(dialogService);
  }
  states;
  cities;
  type = 'Seven Star';
  ngOnInit() {
    this.getState();
    this.getCity('Gujarat');
  }

  onAddHotel(f) {
    console.log(f);
  }

  getState() {
    let res1;
    this.http.get(environment.baseUrl + 'state').subscribe(
      (res) => {
        res1 = res;
        if (res1.error) {
          console.log(res1.message);
        } else {
          this.states = res1.state;
          console.log(this.states);
        }
      }
    );
  }

  getCity(state) {
    let res1;
    this.http.get(environment.baseUrl + 'city?state=' + state).subscribe(
      (res) => {
        res1 = res;
        if (res1.error) {
          console.log(res1.message);
        } else {
          this.cities = res1.city;
          console.log('city');
          console.log(this.cities);
        }
      }
    );
  }
}
