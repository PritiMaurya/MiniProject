import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {AddHotelImgComponent} from "../add-hotel-img/add-hotel-img.component";
import {ManageHotelService} from "../../../services/manage-hotel.service";
export interface DisplayImgModel {
  title: String;
  imgData;
  id: String;
}
@Component({
  selector: 'app-display-img',
  templateUrl: './display-img.component.html',
  styleUrls: ['./display-img.component.css']
})
export class DisplayImgComponent extends DialogComponent<DisplayImgModel, null> implements DisplayImgModel, OnInit {

  title: String;
  imgData;
  id: String;
  constructor(dialogService: DialogService, private hotelService: ManageHotelService) {
    super(dialogService);
  }

  ngOnInit() {
    console.log('imgData');
    console.log(this.imgData);
  }

  addMoreImages() {
    let res1;
    // console.log(this.id, this.imgData[1].placeId);
    this.close();
    this.hotelService.findHotel(this.id).subscribe(
      (res) => {
        res1 = res;
        console.log(res1);
        this.dialogService.addDialog(AddHotelImgComponent, {title: 'Add Image for ' + res1.hotelName , data: res1, des: 'add more'});
      }
    );
  }
}
