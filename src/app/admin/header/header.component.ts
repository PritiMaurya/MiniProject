import { Component, OnInit } from '@angular/core';
import {DialogService} from "ng2-bootstrap-modal";
import {AddPlaceComponent} from "../../modals/place/add-place/add-place.component";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) { }
  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.apiService.token = null;
    this.router.navigate(['/login']);
  }

}
