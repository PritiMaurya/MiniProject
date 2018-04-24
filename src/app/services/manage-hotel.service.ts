import { Injectable } from '@angular/core';
import { environment } from '../config/environment';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ManageHotelService {

  constructor(private http: HttpClient) { }
  addHotel(data) {
      return this.http.post(environment.baseUrl + 'addHotel', data);
  }

  addHotelImage(formData, id) {
    console.log('formData');
    console.log(formData, id);
    return this.http.post(environment.baseUrl + 'addHotelImg?id=' + id, formData);
  }

  displayHotel(pageNo, size, reverse, key) {
    return this.http.get(environment.baseUrl + 'displayHotel?pageNo=' +
      pageNo + '&size=' + size + '&order=' + JSON.stringify(reverse) + '&key=' + key);
  }

  displayHotelImages(id) {
    return this.http.get(environment.baseUrl + 'displayHotelImg?id=' + id);
  }

  deleteHotel(id) {
    return this.http.get(environment.baseUrl + 'deleteHotel?id=' + id);
  }

  findHotel(id) {
    console.log(id);
    return this.http.get(environment.baseUrl + 'findHotel?id=' + id);
  }
  addRoom(data, id) {
    return this.http.post(environment.baseUrl + 'addRoom?id=' + id, data);
  }
}
