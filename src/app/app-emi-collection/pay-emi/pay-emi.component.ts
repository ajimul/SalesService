import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateStockComponent } from 'src/app/app-stock/update-stock/update-stock.component';
import { PayEmi } from 'src/app/model/pay-emi';
import { TransectionalAccounts } from 'src/app/model/transactional-account';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-pay-emi',
  templateUrl: './pay-emi.component.html',
  styleUrls: ['./pay-emi.component.css'],
  providers: [DatePipe]
})
export class PayEmiComponent implements OnInit {
  accountList: any[] = [];
  receivedEmi!:FormGroup
  date: Date = (new Date);
  constructor(
    private service: Service,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { element: any },
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateStockComponent>,
    private datePipe: DatePipe) {}

  getTransactionalAccounts() {
    this.accountList = [];
    this.service.getTransactional_emi_Accounts().subscribe((response: any) => {
      this.accountList = response;
    })

  }
  get accountName() { return this.receivedEmi.get('accountName'); }
  get emiId() { return this.receivedEmi.get('emiId'); }
  get emi_BiId() { return this.receivedEmi.get('emi_BiId'); }
  get emiNo() { return this.receivedEmi.get('emiNo'); }
  get emiAmount() { return this.receivedEmi.get('emiAmount'); }
  get emiStatus() { return this.receivedEmi.get('emiStatus'); }
  get emiDate() { return this.receivedEmi.get('emiDate'); }
  get emiMessage() { return this.receivedEmi.get('emiMessage'); }
  get transactionDate() { return this.receivedEmi.get('transactionDate'); }
  get transactionAccount() { return this.receivedEmi.get('transactionAccount'); }
  get narration() { return this.receivedEmi.get('narration'); }

  payEmi() {
    let transectionalAccounts: TransectionalAccounts = {
      transactionAccountName: this.transactionAccount?.value,
      transactionAmount: Number(this.emiAmount?.value)
    };
    const payEmi: PayEmi = {
      userId: 1,
      accountId: this.data.element.accountId,
      partyAcName: this.accountName?.value,
      transectionDate: String(this.transactionDate?.value),
      narration: String(this.narration?.value),
      emi:{
        emiId: this.emiId?.value,
        emi_BiId: this.emi_BiId?.value,
        emiNo: this.emiNo?.value,
        emiAmount: this.emiAmount?.value,
        emiStatus: "Paid",
        emiDate: this.emiDate?.value,
        emiMessage: this.emiMessage?.value,
        emiSmsStatus: false
      },
      transectionalAccounts: transectionalAccounts
    }
  
    this.service.payEmi(payEmi).subscribe
    ({
      next:(value) =>{ },
      error:(e) =>{console.log(e)},
      complete:() =>{ 
        this.dialogRef.close();
      alert('transaction successfull!');
      },
    })
  }
  ngOnInit(): void {
    
  this.receivedEmi = this.fb.group({
    accountName: new FormControl(this.data.element.accountName),
    emiId: new FormControl(this.data.element.emiId),
    emi_BiId: new FormControl(this.data.element.emi_BiId),
    emiNo: new FormControl(this.data.element.emiNo),
    emiAmount: new FormControl(this.data.element.emiAmount),
    emiStatus: new FormControl(this.data.element.emiStatus),
    emiDate: new FormControl(this.data.element.emiDate),
    emiMessage: new FormControl(this.data.element.emiMessage),
    transactionDate: new FormControl(this.datePipe.transform(this.date, 'yyyy-MM-dd')),
    transactionAccount: new FormControl(),
    narration: new FormControl("Received Emi From " + this.data.element.accountName)
  })
    this.getTransactionalAccounts();
  }
  dialogClose() {
    this.dialogRef.close();
  }
}
