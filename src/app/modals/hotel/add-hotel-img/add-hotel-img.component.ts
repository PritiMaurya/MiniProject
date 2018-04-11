import { Component, OnInit } from '@angular/core';
import {AlertModalComponent} from "../../alert-modal/alert-modal.component";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
export interface AddHotelImgModal{
  title: String;
  data;
}
@Component({
  selector: 'app-add-hotel-img',
  templateUrl: './add-hotel-img.component.html',
  styleUrls: ['./add-hotel-img.component.css']
})
export class AddHotelImgComponent extends DialogComponent<AddHotelImgModal, null> implements AddHotelImgModal {

  title: String;
  data;

  filesToUpload: Array<File> = [];

  constructor(dialogService: DialogService, private apiService: ApiService, private router: Router) {
    super(dialogService);
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }

  onImgAdd() {
    console.log('on Image');
    // console.log(this.data);
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      formData.append('uploads[]', files[i], files[i]['name']);
    }
    console.log('formData', formData);
    this.apiService.addImage(formData, this.data.placeId).subscribe(
      (res) => {
        console.log(res);
        this.close();
        this.dialogService.addDialog(AlertModalComponent, { message: 'Place is successfully added'}).subscribe(
          (data) => {
            this.router.navigate(['/displayPlace']);
          }
        );
      });
  }

}