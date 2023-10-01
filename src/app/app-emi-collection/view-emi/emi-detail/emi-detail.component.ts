import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateEmployeeComponent } from 'src/app/app-employee/update-employee/update-employee.component';
import { BookDetails } from 'src/app/model/bookdetails';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-emi-detail',
  templateUrl: './emi-detail.component.html',
  styleUrls: ['./emi-detail.component.css']
})
export class EmiDetailComponent implements OnInit {

 
  constructor(
    private fb: FormBuilder,
    private service: Service,
    public dialogRef: MatDialogRef<EmiDetailComponent>,
    @Inject(MAT_DIALOG_DATA)
     public data: { element: any,totalEmi:number,totalPaidEmi:number,totalDue:number },
  ) { }

  accountName=this.data.element.accountName;
  partyBillingAddress=this.data.element.partyBillingAddress;
  partyShipingAddress=this.data.element.partyShipingAddress;
  partyContactNo1=this.data.element.partyContactNo1;
  partyContactNo2=this.data.element.partyContactNo2;
  partyEmailId=this.data.element.partyEmailId;
  emiNo=this.data.element.emiNo;
  dueHighlighter = { color: 'black' };
  totalEmi=this.data.totalEmi;
  totalPaidEmi=this.data.totalPaidEmi;
  totalDue=this.data.totalDue;

  ngOnInit(): void {
   
  }


  dialogClose() {
    this.dialogRef.close();
  }

  dueAmountHighlighter() {
    if (this.totalDue!==0) {
      this.dueHighlighter = { color: '#ff0000' };
    } else{
      this.dueHighlighter = { color: 'rgb(113, 235, 0)' };
    }
return true;
  }
}
