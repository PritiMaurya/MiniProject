import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ManageHotelService} from "../../services/manage-hotel.service";
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmModalComponent} from "../../modals/confirm-modal/confirm-modal.component";
import {AlertModalComponent} from "../../modals/alert-modal/alert-modal.component";
import {DisplayImg} from "../../modals/diplay-images/diplay-images.component";
import {DisplayImgComponent} from "../../modals/hotel/display-img/display-img.component";
import {AddRoomComponent} from "../../modals/hotel/add-room/add-room.component";

@Component({
  selector: 'app-display-hotels',
  templateUrl: './display-hotels.component.html',
  styleUrls: ['./display-hotels.component.css']
})
export class DisplayHotelsComponent implements OnInit {
  hotelsData = [];
  totalPage = [];
  size1;
  data;
  reverse;
  page = 1;
  key = 'date';
  @ViewChild('pageSize') size: ElementRef;

  constructor(private hotelService: ManageHotelService, private dialogService: DialogService) { }

  ngOnInit() {
    this.size1 = this.size.nativeElement.value;
    this.reverse = true;
    this.getHotelData(this.page);
  }
  click(key) {
    this.key = key;
    if (this.reverse) {
      this.reverse = false;
      this.getHotelData(this.page);
    } else {
      this.reverse = true;
      this.getHotelData(this.page);
    }
  }
  displayHotelImages(id) {
    this.hotelService.displayHotelImages(id).subscribe(
      (res) => {
        this.dialogService.addDialog(DisplayImgComponent, {title: 'Hotel Images', imgData: res, id: id});
      }
    );
  }

  delete(id) {
    let res1;
    this.dialogService.addDialog(ConfirmModalComponent, {title: 'Delete Confirmation', message: 'Are you sure to delete this'}).subscribe(
      (data) => {
        console.log('delete', this.page);
        if (data) {
          this.hotelService.deleteHotel(id).subscribe(
            (res) => {
              res1 = res;
              if (res1.error) {
                this.dialogService.addDialog(AlertModalComponent, {message: 'Error while deleting Hotel'});
              } else {
                this.dialogService.addDialog(AlertModalComponent, {message: 'The selected hotel detail successfully Deleted'});
                this.getHotelData(this.page);
              }
            }
          );
        }
      }
    );
  }
  getHotelData(page) {
    let p1;
    this.page = page;
    const total = [];
    console.log('page', this.page,  this.totalPage.length);

    if (this.page <= 0) {
      this.page = 1;
    } else {
      this.size1 = this.size.nativeElement.value;
      this.hotelService.displayHotel(page, this.size1, this.reverse, this.key).subscribe(
        (res) => {
          this.data = res;
          console.log(res);
          this.hotelsData = this.data.message;
          p1 = this.data.pages;
          for (let i = 0; i < p1; i++) {
            total[i] = i;
          }
          this.totalPage = total;
        }
      );
    }
    // console.log('delete', this.pageData);
  }

  addRoomDialog(hotelId, hotelName) {
    this.dialogService.addDialog(AddRoomComponent, {title: 'Add Room Detail', hotelId: hotelId, hotelName: hotelName});
  }
}
