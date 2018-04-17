import { Component } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ManageHotelService} from "../../../services/manage-hotel.service";
import {AlertModalComponent} from "../../alert-modal/alert-modal.component";
export interface AddRoomModel {
  title: String;
  hotelId;
  hotelName;
}
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent extends DialogComponent<AddRoomModel, null> implements AddRoomModel {
  title: String;
  hotelId;
  hotelName;
  rate1;
  constructor(dialogService: DialogService, private hotelService: ManageHotelService) {
    super(dialogService);
    this.selectType('Single');
  }
  selectType(type) {
    if (type === 'Single') {
      this.rate1 = 500;
    } else {
      this.rate1 = 1000;
    }
  }
  onAddRoom(f) {
    console.log(f.value);
    console.log('hotel Id', this.hotelId);
    let res1;
    // {num: "12", Room Type: "Single", rate: 500}
    console.log({no: f.value.num, rate: f.value.rate, roomType: f.value.roomType});
    this.hotelService.addRoom({no: f.value.num, rate: f.value.rate, roomType: f.value.roomType}, this.hotelId).subscribe(
      (res) => {
        res1 = res;
        if (res1.error) {
          this.dialogService.addDialog(AlertModalComponent, {message: res1.message});
        } else {
          this.dialogService.addDialog(AlertModalComponent, {message: res1.message});
        }
        this.close();
      }
    );
  }
}
