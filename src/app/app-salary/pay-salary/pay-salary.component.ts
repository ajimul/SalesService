import { Component, OnInit } from '@angular/core';

import { Service } from 'src/app/services/service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PaySalary } from 'src/app/model/paySalary';
import { EmployeeDetailsDTO } from 'src/app/model/employee';
import { TransectionalAccounts } from 'src/app/model/transactional-account';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pay-salary',
  templateUrl: './pay-salary.component.html',
  styleUrls: ['./pay-salary.component.css'],
  providers: [DatePipe]
})
export class PaySalaryComponent implements OnInit {
  paySalary!:FormGroup;
  employeeList: any[] = [];
  date: Date = (new Date);
  accountList: any[] = [];
  accountId!: number;
  constructor(
    private service: Service,
      private formBuilder: FormBuilder,
    public fb: FormBuilder,
    private datePipe: DatePipe,
    ) { }


  getEmployee() {
    this.employeeList = [];
    this.service.getEmployee().subscribe((response: any) => {
      this.employeeList = response;
    })

  }
  getTransactionalAccounts() {
    this.accountList = [];
    this.service.getTransactional_salary_Accounts().subscribe((response: any) => {
      this.accountList = response;
    })

  }
  get employeeAcName() { return this.paySalary.get('employeeAcName'); }
  get transactionDate() { return this.paySalary.get('transactionDate'); }
  get transactionAccount() { return this.paySalary.get('transactionAccount'); }
  get narration() { return this.paySalary.get('narration'); }
  get salaryAmount() { return this.paySalary.get('salaryAmount'); }



  payEmi() {
    let transectionalAccounts: TransectionalAccounts = {
      transactionAccountName: this.transactionAccount?.value,
      transactionAmount: Number(this.salaryAmount?.value)
    };
    let paySalary: PaySalary = {
      userId: 1,
      accountId:this.accountId,
      employeeAcName: this.employeeAcName?.value,
      transectionDate: String(this.transactionDate?.value),
      narration: this.narration?.value,
      transectionalAccounts: transectionalAccounts
    }
     this.service.paySalary(paySalary).subscribe({
      next:(value) =>{ },
      error:(e) =>{console.log(e)},
      complete:() =>{ 
        alert('transaction successfull!');
        this.paySalary = this.fb.group({
          employeeAcName: new FormControl(),
          salaryAmount: new FormControl(),
          transactionDate: new FormControl(this.datePipe.transform(this.date, 'yyyy-MM-dd')),
          transactionAccount: new FormControl(),
          narration: new FormControl()
      })}
    })
     
  }
  ngOnInit(): void {
    this.paySalary = this.fb.group({
      employeeAcName: new FormControl(),
      salaryAmount: new FormControl(),
      transactionDate: new FormControl(this.datePipe.transform(this.date, 'yyyy-MM-dd')),
      transactionAccount: new FormControl(),
      narration: new FormControl()
    })
    this.getEmployee();
   this.getTransactionalAccounts();
  }

}
