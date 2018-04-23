import { Injectable } from '@angular/core';
import { environment } from '../config/environment';
import {HttpClient} from '@angular/common/http';
// import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ApiService {
  errorMsg = false;
  d;
  token;
  constructor(private http: HttpClient) {
    // console.log('check expire ', tokenNotExpired());
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
    let res1;
    this.token = localStorage.getItem('token');
    if (this.token === null) {
      return false;
    } else {
       return this.http.get(environment.baseUrl + 'check?token=' + this.token).subscribe(
        (res) => {
          // console.log('res ', res);
          res1 = res;
          console.log('res1', res1, 'err', res1.error);
          console.log('err ', res1.error);
          if (res1.error) {
            console.log('false');
            return false;
          } else {
            return true;
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
    // console.log(pageNo, size, reverse);
    return this.http.get(environment.baseUrl +
      'page?pageNo=' + pageNo + '&size=' + size + '&order=' + JSON.stringify(reverse) + '&key=' + key);
  }

  displayUser(pageNo, size, reverse, key) {
    return this.http.get(environment.baseUrl + 'displayUser?pageNo=' +
      pageNo + '&size=' + size + '&order=' + JSON.stringify(reverse) + '&key=' + key);
  }

  deleteUser(id) {
    return this.http.delete(environment.baseUrl + 'deleteUser?id=' + id);
  }

  changePassword(changeData) {
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

