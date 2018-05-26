import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../config/environment';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class UserDataService {
  userData;
  changeDate = new Subject<any>();
  constructor(private http: HttpClient) { }
  getHotelImg() {
    return this.http.get(environment.baseUrl + 'getHotels');
  }

  roomDetail(id) {
    return this.http.get(environment.baseUrl + 'getRoom?id=' + id);
  }
  findUser() {
    let res1;
    return this.http.get(environment.baseUrl + 'findUser').subscribe(
      (res) => {
        res1 = res;
        this.userData = res1.data[0];
      }, (err) => {
        console.log(err);
      }
    );
  }
  bookRoom(data) {
    return this.http.post(environment.baseUrl + 'bookRoom?id=' + this.userData.userId, data);
  }
  changeEmail(email) {
    return this.http.post(environment.baseUrl + 'changeEmail', email);
  }

  findBookingData() {
    return this.http.get(environment.baseUrl + 'findBooking');
  }

  cancelBooking() {
    return this.http.get(environment.baseUrl + 'cancelBooking');
  }

  updateDate(data) {
    return this.http.post(environment.baseUrl + 'updateBooking', data);
  }
}
