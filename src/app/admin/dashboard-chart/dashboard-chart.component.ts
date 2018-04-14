import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css']
})
export class DashboardChartComponent implements OnInit {

  ngOnInit() {
    console.log(this.apiService.hotelCount);
  }

  constructor(private apiService: ApiService) {


  }
}
