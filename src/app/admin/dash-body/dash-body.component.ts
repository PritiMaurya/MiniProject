import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../config/environment";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-dash-body',
  templateUrl: './dash-body.component.html',
  styleUrls: ['./dash-body.component.css']
})
export class DashBodyComponent implements OnInit {
  id = 'chart1';
  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;
  userCount; hotelCount; placeCount
  constructor(private http: HttpClient, private apiService: ApiService) {

  }

  ngOnInit() {
    this.countUser();
    this.countHotel();
    this.countPlace();
  }

  countUser() {
    let res1;
    this.http.get(environment.baseUrl + 'countUser').subscribe(
      (res) => {
        res1 = res;
        this.userCount = +res1.count;
        return (this.userCount);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  countHotel() {
    let res1;
    this.http.get(environment.baseUrl + 'countHotel').subscribe(
      (res) => {
        res1 = res;
        this.hotelCount = +res1.count;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  countPlace() {
    let res1;
    this.http.get(environment.baseUrl + 'countPlace').subscribe(
        (res) => {
          res1 = res;
          this.placeCount = +res1.count;
          console.log(res);
          this.dataSource = {
            'chart': {
              'caption': 'Data',
              'subCaption': 'Information',
              'theme': 'fint'
            },
            'data': [
              {
                'label': 'Hotel',
                'value': this.hotelCount
              },
              {
                'label': 'Registered User',
                'value': this.userCount
              },
              {
                'label': 'Place',
                'value': this.placeCount
              }
            ]
          };
        },
        (err) => {
          console.log(err);
        }
      );
    }
}
