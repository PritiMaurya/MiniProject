import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ManageHotelService} from "../../services/manage-hotel.service";
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmModalComponent} from "../../modals/confirm-modal/confirm-modal.component";
import {AlertModalComponent} from "../../modals/alert-modal/alert-modal.component";
import {DisplayImg} from "../../modals/diplay-images/diplay-images.component";
import {DisplayImgComponent} from "../../modals/hotel/display-img/display-img.component";
import {AddRoomComponent} from "../../modals/hotel/add-room/add-room.component";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-display-hotels',
  templateUrl: './display-hotels.component.html',
  styleUrls: ['./display-hotels.component.css']
})
export class DisplayHotelsComponent implements OnInit {
  hotelsData = []; totalPage = []; size1;
  data; reverse; page = 1; key = 'date'; dropdownList = []; selectedItems = [];
  dropdownSettings = {}; token;
  hideState = true; hideCity = true; hideType = true; hideView = true; hideDelete = true; hideRoom = true; hideTotal = true;
  @ViewChild('pageSize') size: ElementRef;

  constructor(private hotelService: ManageHotelService, private dialogService: DialogService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.size1 = this.size.nativeElement.value;
    this.reverse = true;
    this.getHotelData(this.page);
    this.dropdownList = [
      {'id': 1, 'itemName': 'State'},
      {'id': 2, 'itemName': 'City'},
      {'id': 3, 'itemName': 'Hotel Type'},
      {'id': 4, 'itemName': 'View Images'},
      {'id': 5, 'itemName': 'Delete'},
      {'id': 6, 'itemName': 'Add Room'},
      {'id': 7, 'itemName': 'Total Room'}
    ];
    this.selectedItems = [
      {'id': 1, 'itemName': 'State'},
      {'id': 2, 'itemName': 'City'},
      {'id': 3, 'itemName': 'Hotel Type'},
      {'id': 4, 'itemName': 'View Images'},
      {'id': 5, 'itemName': 'Delete'},
      {'id': 6, 'itemName': 'Add Room'},
      {'id': 7, 'itemName': 'Total Room'}
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Column',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
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
  onItemSelect(item: any) {
    console.log('onSelect  ', item);
    if (item.itemName === this.dropdownList[0].itemName) {
      this.hideState = true;
    }
    if (item.itemName === this.dropdownList[1].itemName) {
      this.hideCity = true;
    }
    if (item.itemName === this.dropdownList[2].itemName) {
      this.hideType = true;
    }
    if (item.itemName === this.dropdownList[3].itemName) {
      this.hideView = true;
    }
    if (item.itemName === this.dropdownList[4].itemName) {
      this.hideDelete = true;
    }
    if (item.itemName === this.dropdownList[5].itemName) {
      this.hideRoom = true;
    }
    if (item.itemName === this.dropdownList[6].itemName) {
      this.hideTotal = true;
    }
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);

    if (item.itemName === this.dropdownList[0].itemName) {
      this.hideState = false;
    }
    if (item.itemName === this.dropdownList[1].itemName) {
      this.hideCity = false;
    }
    if (item.itemName === this.dropdownList[2].itemName) {
      this.hideType = false;
    }
    if (item.itemName === this.dropdownList[3].itemName) {
      this.hideView = false;
    }
    if (item.itemName === this.dropdownList[4].itemName) {
      this.hideDelete = false;
    }
    if (item.itemName === this.dropdownList[5].itemName) {
      this.hideRoom = false;
    }
    if (item.itemName === this.dropdownList[6].itemName) {
      this.hideTotal = false;
    }
  }
  onSelectAll(items: any) {
    this.hideTotal = true;
    this.hideRoom = true;
    this.hideDelete = true;
    this.hideState = true;
    this.hideCity = true;
    this.hideView = true;
    this.hideType = true;
  }
  onDeSelectAll(items: any) {
    this.hideTotal = false;
    this.hideRoom = false;
    this.hideDelete = false;
    this.hideState = false;
    this.hideCity = false;
    this.hideView = false;
    this.hideType = false;
  }
}
