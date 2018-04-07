import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ConfirmModalComponent} from "../../modals/confirm-modal/confirm-modal.component";
import {DialogService} from "ng2-bootstrap-modal";
import {AlertModalComponent} from "../../modals/alert-modal/alert-modal.component";

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {
  userData; page; size1; totalPage; reverse = false;
  @ViewChild('pageSize') size: ElementRef;
  key = 'userName';
  constructor(private apiService: ApiService, private dialogService: DialogService) { }

  ngOnInit() {
    this.getUserData(1);
  }
  delete(id) {
    let res1;
    this.dialogService.addDialog(ConfirmModalComponent, {title: 'Delete Confirmation', message: 'Are you to delete this user ?'}).subscribe(
      (result) => {
          if (result) {
              this.apiService.deleteUser(id).subscribe(
                (res) => {
                  res1 = res;
                  if (res1.error) {
                      this.dialogService.addDialog(AlertModalComponent, {message: 'Error while deleting user'});
                  } else {
                    this.dialogService.addDialog(AlertModalComponent, {message: 'User detail Deleted successfully'});
                    this.getUserData(this.page);
                  }
                }
              );
          }
      }
    );
  }
  click() {
    if (this.reverse) {
      this.reverse = false;
      this.getUserData(this.page);
    } else {
      this.reverse = true;
    }
  }
  getUserData(page) {
    // let data1;
    // this.apiService.displayUser().subscribe(
    //   (res) => {
    //     console.log(res);
    //     data1 = res;
    //     this.userData = data1.data;
    //     console.log(this.userData);
    //   }
    // );
    let p1;
    let res1;
    this.page = page;
    const total = [];
    // console.log('delete', this.pageData);
    this.size1 = this.size.nativeElement.value;
    console.log(this.page, this.size1);
    this.apiService.displayUser(this.page, this.size1, this.reverse, this.key).subscribe(
      (res) => {
        res1 = res;
        if (res1.error) {
          this.dialogService.addDialog(AlertModalComponent, {message: 'Error Fetching data'});
        } else {
          console.log(res1.message);
          this.userData = res1.message;
          p1 = res1.pages;
          for (let i = 0; i < p1; i++) {
            total[i] = i;
          }
          this.totalPage = total;
        }
      }
    );
  }
}
