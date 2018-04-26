import { Component, OnInit } from '@angular/core';
import {AlertModalComponent} from "../../alert-modal/alert-modal.component";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Router} from "@angular/router";
import {ManageHotelService} from "../../../services/manage-hotel.service";
import {DisplayImgComponent} from "../display-img/display-img.component";
export interface AddHotelImgModal{
  title: String;
  data;
  des;
}
@Component({
  selector: 'app-add-hotel-img',
  templateUrl: './add-hotel-img.component.html',
  styleUrls: ['./add-hotel-img.component.css']
})
export class AddHotelImgComponent extends DialogComponent<AddHotelImgModal, null> implements AddHotelImgModal {

  title: String;
  data;
  des;
  filesToUpload: Array<File> = [];

  constructor(dialogService: DialogService, private hotelService: ManageHotelService, private router: Router) {
    super(dialogService);
  }
  fileChangeEvent1(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }

  onHotelImgAdd() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      formData.append('uploads[]', files[i], files[i]['name']);
    }
    console.log('formData', formData);
    this.hotelService.addHotelImage(formData, this.data.hotelId).subscribe(
      (res) => {
        // console.log(res);
        this.close();
        if (this.des === 'add') {
          this.dialogService.addDialog(AlertModalComponent, { message: 'Hotel detail successfully added'}).subscribe(
            (data) => {
              this.router.navigate(['/displayHotel']);
            }
          );
        } else {
          this.dialogService.addDialog(AlertModalComponent, { message: 'Place Images successfully added'}).subscribe(
            (data) => {
              this.hotelService.displayHotelImages(this.data.hotelId).subscribe(
                (resdata) => {
                  this.dialogService.addDialog(DisplayImgComponent,
                    {title: 'Picture of ' + this.data.hotelName, imgData: resdata, id: this.data.hotelId});
                }
              );
            }
          );
        }
      });
  }

}
