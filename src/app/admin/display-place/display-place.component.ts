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
  placeData = [];
  totalPage = [];
  size1;
  data;
  @ViewChild('pageSize') size: ElementRef;
  constructor(private apiService: ApiService, private dialogService: DialogService) { }
  ngOnInit() {
      this.size1 = this.size.nativeElement.value;
      this.getData(1);
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
              // this.select();
          }
        );
      }
    );
  }

  //
  getData(page) {
    let p1;
    this.size1 = this.size.nativeElement.value;
    this.apiService.pageData(page, this.size1).subscribe(
      (res) => {
        this.data = res;
        this.placeData = this.data.message;
         p1 = this.data.pages;
        for (let i = 0; i < p1; i++) {
          this.totalPage[i] = i;
        }
        console.log('array', p1);
        console.log(this.totalPage);
      }
    );
  }
}
