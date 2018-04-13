import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {AddImageComponent} from "../add-image/add-image.component";
export interface AddPlaceModal {
  title: String;
}
@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})

// export class LoginModalComponent extends DialogComponent<LoginModal, null> implements LoginModal {

export class AddPlaceComponent extends DialogComponent<AddPlaceModal, null> implements AddPlaceModal {
  title: String
  constructor(public dialogService: DialogService, private apiService: ApiService) {
    super(dialogService);
  }
  onAdd(f) {
    this.apiService.addPlace({pName: f.value.pName, pDesc: f.value.pDesc}).subscribe(
      (res) => {
        const d = res[0];
        console.log('place');
        console.log(res);
        this.dialogService.addDialog(AddImageComponent, {title: 'Add Image for ' + f.value.pName , data: d, des: 'add'});
        this.close();
      }
    );
  }
}
