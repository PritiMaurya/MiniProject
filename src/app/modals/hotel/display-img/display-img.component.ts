import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
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
  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
  }
}
