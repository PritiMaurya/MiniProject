import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-alert1',
  templateUrl: './alert1.component.html',
  styleUrls: ['./alert1.component.css']
})
export class Alert1Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Alert1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit() {
  }
  onClickOk() {
    this.dialogRef.close();
  }
}
