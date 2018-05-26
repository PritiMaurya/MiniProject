import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-model1',
  templateUrl: './confirm-model1.component.html',
  styleUrls: ['./confirm-model1.component.css']
})
export class ConfirmModel1Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModel1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
  }

  onClickYes() {
    this.dialogRef.close('true');
  }
}
