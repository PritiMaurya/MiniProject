import { Component, OnInit } from '@angular/core';
import {DialogService} from "ng2-bootstrap-modal";
import {Router} from "@angular/router";
import {AddPlaceComponent} from "../../modals/place/add-place/add-place.component";

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent {

  constructor(private dialogService: DialogService, private router: Router) {}

}
