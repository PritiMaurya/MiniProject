import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
export interface ConfirmModel {
  title: String;
  message: String;
}
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent extends DialogComponent<ConfirmModel, null> implements ConfirmModel {
  title: String;
  message: String;
  result;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    this.result = true;
    console.log('yes');
    this.close();
  }
  cancel() {
    this.result = false;
    console.log('No');
    this.close();
  }
}
