import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../config/environment';
@Injectable()
export class UserDataService {
  result;
  constructor(private http: HttpClient) { }
  getHotelImg() {
    return this.http.get(environment.baseUrl + 'getHotels');
  }
}
