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
  fileToUpload;
  roomType = 'Premier Room';
  constructor(dialogService: DialogService, private hotelService: ManageHotelService) {
    super(dialogService);
  }
  fileChangeEvent1(fileInput: any) {
    this.fileToUpload = fileInput.target.files[0];
    console.log(this.fileToUpload);
    // this.product.photo = fileInput.target.files[0]['name'];
  }
  onAddRoom(f) {
    console.log(f.value);
    console.log('hotel Id', this.hotelId);
    let res1;
    const formData: any = new FormData();
    formData.append('uploadRoom', this.fileToUpload, this.fileToUpload['name']);
    console.log('form Data');
    formData.append('no', f.value.num);
    formData.append('rate', f.value.rate);
    formData.append('roomType', f.value.roomType);
    console.log('roomType  ', f.value.roomType);
    this.hotelService.addRoom(formData, this.hotelId).subscribe(
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
