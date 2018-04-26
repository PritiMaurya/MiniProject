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
  dropdownList; selectedItems; dropdownSettings;
  constructor(private http: HttpClient, public dialogService: DialogService, private hotelService: ManageHotelService) {
    super(dialogService);
    this.dropdownList = [
      {'id': 1, 'itemName': 'WIFI'},
      {'id': 2, 'itemName': 'Food'},
      {'id': 3, 'itemName': 'Break Fast'},
      {'id': 4, 'itemName': 'Cab'},
      {'id': 5, 'itemName': 'Currency exchange'},
      {'id': 6, 'itemName': '24-hour Room Service'}
    ];
    this.selectedItems = [
      {'id': 1, 'itemName': 'WIFI'},
      {'id': 2, 'itemName': 'Food'}
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Add Services',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
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
    let res1, formService;
    let services = '';
    console.log('services', f.value.addServices);
    formService = f.value.addServices;
    formService.map((x) => {
      services = services + x.itemName + ', ';
    });
    services = services.slice(0, services.length - 2);

    const hotelData = {
      placeId: this.placeId,
      hotelName: f.value.hotelName,
      hotelAdd: f.value.hotelAdd,
      contact: f.value.contact,
      city: f.value.city,
      state: f.value.state,
      hotelType: f.value.hotelType,
      total: f.value.totRoom,
      services: services};
    console.log(services);
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
