import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {AddImageComponent} from "../place/add-image/add-image.component";
import {ApiService} from "../../services/api.service";


export interface DisplayImg {
  title: String;
  imgData;
  id: String;
}

@Component({
  selector: 'app-diplay-images',
  templateUrl: './diplay-images.component.html',
  styleUrls: ['./diplay-images.component.css']
})

// export class ConfirmModalComponent extends DialogComponent<ConfirmModel, null> implements ConfirmModel {

export class DiplayImagesComponent extends DialogComponent<DisplayImg, null>implements DisplayImg, OnInit {
  title: String;
  imgData;
  id: String;
  constructor(dialogService: DialogService, private apiService: ApiService) {
    super(dialogService);
  }

  ngOnInit() {
  }

  addMoreImage() {
    let res1;
    // console.log(this.id, this.imgData[1].placeId);
    this.close();
    this.apiService.findPlace(this.id).subscribe(
      (res) => {
        res1 = res;
        console.log(res1);
        this.dialogService.addDialog(AddImageComponent, {title: 'Add Image for ' + res1.placeName , data: res1, des: 'add more'});
      }
    );
  }
}
