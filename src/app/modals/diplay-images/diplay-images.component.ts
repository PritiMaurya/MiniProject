import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';


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

export class DiplayImagesComponent extends DialogComponent<DisplayImg, null>implements OnInit {
  title: String;
  imgData;
  id: String;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
  }

}
