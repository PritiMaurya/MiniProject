import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../config/environment';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ManageHotelService} from "../../../services/manage-hotel.service";
import {AddHotelImgComponent} from "../add-hotel-img/add-hotel-img.component";
export interface AddHotelModel {
  title: String;
  placeId;
  placeName;
}

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent extends DialogComponent<AddHotelModel, null> implements OnInit, AddHotelModel{
  title: String;
  placeId;
  placeName;
  constructor(private http: HttpClient, public dialogService: DialogService, private hotelService: ManageHotelService) {
    super(dialogService);
  }
  states;
  cities;
  state1 = 'Gujarat';
  city1 = 'Surat';
  type = 'Seven Star';
  ngOnInit() {
    this.getState();
    this.getCity('Gujarat');
  }

  onAddHotel(f) {
    let res1;
    const hotelData = {
      placeId: this.placeId,
      hotelName: f.value.hotelName,
      hotelAdd: f.value.hotelAdd,
      contact: f.value.contact,
      city: f.value.city,
      state: f.value.state,
      hotelType: f.value.hotelType,
      total: f.value.totRoom };
    this.hotelService.addHotel(hotelData).subscribe(
      (res) => {
        res1 = res;
          this.close();
          this.dialogService.addDialog(AddHotelImgComponent, {title: 'Add Image', data: res1.data, des: 'add'});
      }
    );
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
          this.city1 = this.cities[0].city;
        }
      }
    );
  }
}
