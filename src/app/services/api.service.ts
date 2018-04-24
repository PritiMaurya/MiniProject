import { Injectable } from '@angular/core';
import { environment } from '../config/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {
  errorMsg;
  d;
  token; blur;
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


