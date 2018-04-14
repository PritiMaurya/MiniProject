import { Injectable } from '@angular/core';
import { environment } from '../config/environment';
import {HttpClient} from "@angular/common/http";
import 'rxjs/Rx';
@Injectable()
export class ApiService {
  errorMsg = false;
  d;
  tokenData;
  token;
  hotelCount;
  placeCount;
  userCount;
  constructor(private http: HttpClient) {
    // console.log(environment.baseUrl);
  }

  signIn(data) {
    return this.http.post(environment.baseUrl + 'login', data);
  }

  addPlace(data) {
    return this.http.post(environment.baseUrl + 'addPlace', data);
  }

  addImage(formData, id) {
    return this.http.post(environment.baseUrl + 'addImg?id=' + id, formData);
  }

  checkToken() {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      return false;
    } else {
      return this.http.get(environment.baseUrl + 'check?token=' + this.token).subscribe(
        (res) => {
          this.tokenData = res[0];
          if (this.tokenData == null) {
            console.log('false');
            return false;
          } else {
            console.log('token', this.tokenData.token);
            if ( this.token === this.tokenData.token) {
              return true;
            } else {
              return false;
            }
          }
        }
      );
    }
  }

  displayPlace() {
    return this.http.get(environment.baseUrl + 'display');
  }

  displayImage(id) {
    return this.http.get(environment.baseUrl + 'displayImg?id=' + id);
  }

  deletePlace(id) {
    return this.http.get(environment.baseUrl + 'deletePlace?id=' + id);
  }
  findPlace(id) {
    return this.http.get(environment.baseUrl + 'findById?id=' + id);
  }
  pageData(pageNo, size, reverse, key) {
    console.log(pageNo, size, reverse);
    return this.http.get(environment.baseUrl +
      'page?pageNo=' + pageNo + '&size=' + size + '&order=' + JSON.stringify(reverse) + '&key=' + key);
  }

  displayUser(pageNo, size, reverse) {
    console.log(pageNo, size, reverse);
    console.log(typeof JSON.stringify(reverse));
    return this.http.get(environment.baseUrl + 'displayUser?pageNo=' + pageNo + '&size=' + size + '&order=' + JSON.stringify(reverse));
  }

  deleteUser(id) {
    return this.http.delete(environment.baseUrl + 'deleteUser?id=' + id);
  }

  changePassword(changeData){
    return this.http.post(environment.baseUrl + 'changePassword', changeData);
  }

  signUpUser(data) {
    return this.http.post(environment.baseUrl + 'signUp', data);
  }
}

// checkToken() {
//   const token = localStorage.getItem('token');
//   console.log(token);
//   return this.http.get(this.baseUrl + '/check?token=' + token).subscribe(
//     (res) => {
//       this.data = res[0];
//       console.log('auth');
//       console.log(this.data);
//       if (token === this.data.token) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   );

