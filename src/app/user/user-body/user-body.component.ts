import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../../services/user-data.service';

@Component({
  selector: 'app-user-body',
  templateUrl: './user-body.component.html',
  styleUrls: ['./user-body.component.css']
})
export class UserBodyComponent implements OnInit {
  result
  constructor(private userService: UserDataService) {
    let res1;
    this.userService.getHotelImg().subscribe(
      (res) => {
        res1 = res;
        this.result = res1.data;
      }
    );
  }

  ngOnInit() {
  }

}
