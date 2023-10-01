import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit{
  constructor( @Inject(MAT_DIALOG_DATA) public data: [{ alert_text1: any}, {alert_text2: any}],
    public dialogRef: MatDialogRef<AlertComponent>) { }
    alert_text1!:string;
    alert_text2!:string;
  ngOnInit(): void {
    this.alert_text1=this.data[0].alert_text1;
    this.alert_text2=this.data[1].alert_text2;
  }

  dialogClose() {
    this.dialogRef.close();
  }
    
}
