import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {
  token;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
  }

}
