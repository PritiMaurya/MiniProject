import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DialogService} from 'ng2-bootstrap-modal';
import {DiplayImagesComponent} from '../../modals/diplay-images/diplay-images.component';
import {ConfirmModalComponent} from '../../modals/confirm-modal/confirm-modal.component';
import {AlertModalComponent} from '../../modals/alert-modal/alert-modal.component';
import {AddHotelComponent} from '../../modals/hotel/add-hotel/add-hotel.component';
import {AddPlaceComponent} from '../../modals/place/add-place/add-place.component';

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
  key; token;
  reverse = true;
  page = 1;
  @ViewChild('pageSize') size: ElementRef;
  constructor(private apiService: ApiService, private dialogService: DialogService) { }
  ngOnInit() {
      this.token = localStorage.getItem('token');
      this.size1 = this.size.nativeElement.value;
      this.key = 'date';
      this.getData(this.page);
  }
  displayImages(id, name) {
    this.apiService.displayImage(id).subscribe(
      (res) => {
        this.dialogService.addDialog(DiplayImagesComponent, {title: 'Picture of ' + name, imgData: res, id: id});
      }
    );
  }

  delete(id) {
    let res1;
    this.dialogService.addDialog(ConfirmModalComponent, {title: 'Delete Confirmation', message: 'Are you sure to delete this'}).subscribe(
      (data) => {
        console.log('delete', this.page);
        if (data) {
          this.apiService.deletePlace(id).subscribe(
            (res) => {
              res1 = res;
              if (res1.error) {
                this.dialogService.addDialog(AlertModalComponent, {message: 'Error while deleting Place'});
              } else {
                this.dialogService.addDialog(AlertModalComponent, {message: 'The selected Place detail successfully Deleted'});
                this.getData(this.page);
              }
            }
          );
        }
      }
    );
  }
  addHotelDialog(id, placeName) {
    this.dialogService.addDialog(AddHotelComponent, {title: 'Add Hotel', placeId: id, placeName: placeName});
  }
  click(key) {
    this.key = key;
    if (this.reverse) {
      this.reverse = false;
      this.getData(this.page);
    } else {
      this.reverse = true;
      this.getData(this.page);
    }
  }

    getData(page) {
    let p1;
    this.page = page;
    const total = [];
    // console.log('delete', this.pageData);
    this.size1 = this.size.nativeElement.value;
    this.apiService.pageData(page, this.size1, this.reverse, this.key).subscribe(
      (res) => {
        this.data = res;
        this.placeData = this.data.message;
         p1 = this.data.pages;
        for (let i = 0; i < p1; i++) {
          total[i] = i;
        }
        this.totalPage = total;
      }
    );
  }

  addForm() {
    this.dialogService.addDialog(AddPlaceComponent, {title: 'Add Place'});
  }
}
