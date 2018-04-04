import { Component, OnInit } from '@angular/core';
import {DialogService} from "ng2-bootstrap-modal";
import {AddPlaceComponent} from "../../modals/place/add-place/add-place.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('token');
    console.log('logout');
    this.router.navigate(['/admin']);
  }

}
