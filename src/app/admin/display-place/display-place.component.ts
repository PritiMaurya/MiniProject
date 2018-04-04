import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {DialogService} from "ng2-bootstrap-modal";
import {DiplayImagesComponent} from "../../modals/diplay-images/diplay-images.component";
import {ConfirmModalComponent} from "../../modals/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-display-place',
  templateUrl: './display-place.component.html',
  styleUrls: ['./display-place.component.css']
})
export class DisplayPlaceComponent implements OnInit {
  placeData;
  @ViewChild('pageSize') size: ElementRef;
  constructor(private apiService: ApiService, private dialogService: DialogService) { }

  ngOnInit() {
      this.select();
      const size1 = this.size.nativeElement.value;
      console.log(size1);
  }
  displayImages(id) {
    this.apiService.displayImage(id).subscribe(
      (res) => {
        this.dialogService.addDialog(DiplayImagesComponent, {title: 'Place Images', imgData: res, id: id});
      }
    );
  }

  delete(id) {
    this.dialogService.addDialog(ConfirmModalComponent, {title: 'Delete Confirmation', message: 'Are you sure to delete this'}).subscribe(
      (data) => {
        // console.log(data);
        this.apiService.deletePlace(id).subscribe(
          (data1) => {
              console.log(data1);
              this.select();
          }
        );
      }
    );
  }

  select() {
    this.apiService.displayPlace().subscribe(
      (res) => {
        this.placeData = res;
      }
    );
  }
}
