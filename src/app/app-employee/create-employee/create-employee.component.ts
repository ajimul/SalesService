import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/app-alert-message/alert/alert.component';
import { CreatePartyComponent } from 'src/app/app-party/create-party/create-party.component';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  isGstNo = "display:none";
  isGstIn: boolean = true;
  date = new Date;
  employeeForm!:FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: Service,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateEmployeeComponent>,
  ) { }

 


  get employeeName() {
    return this.employeeForm.get('accountName');

  }
  get empContactNo1() {
    return this.employeeForm.get('empContactNo1');

  }


  get employeeBillingAdd() {
    return this.employeeForm.get('empBillingAddress');

  }
  get employeeShipingAdd() {
    return this.employeeForm.get('empShipingAddress');

  }


  formSubmit() {
    if (this.employeeForm.invalid) {
      if (this.employeeName && this.employeeName.invalid) {
        (document.querySelector('#name') as HTMLElement).style.borderColor = '#FF0A0A';
        (document.querySelector('#labelName') as HTMLElement).style.color = '#FF0A0A';
        (document.querySelector('#name-span') as HTMLElement).style.color = '#FF0A0A';
        this.openDialogAlert("Employee Name should not empty!","Please enter employee name to continue...");
      }
      else {
        (document.querySelector('#name') as HTMLElement).style.borderColor = 'black';
        (document.querySelector('#labelName') as HTMLElement).style.color = 'black';
        (document.querySelector('#name-span') as HTMLElement).style.color = 'black';
      }

      if (this.empContactNo1 && this.empContactNo1.invalid) {
        (document.querySelector('#mobile1') as HTMLElement).style.borderColor = '#FF0A0A';
        (document.querySelector('#labelMobile1') as HTMLElement).style.color = '#FF0A0A';
        (document.querySelector('#mobile1-span') as HTMLElement).style.color = '#FF0A0A';
        this.openDialogAlert("Mobile No. should not empty!","Please enter 10 Digit Mobile No. to continue...");
  
      }
      else {
        (document.querySelector('#mobile1') as HTMLElement).style.borderColor = 'black';
        (document.querySelector('#labelMobile1') as HTMLElement).style.color = 'black';
        (document.querySelector('#mobile1-span') as HTMLElement).style.color = 'black';
      }


    } else {
      this.service.addEmployee(this.employeeForm?.value)
        .subscribe({
          next: (value) => {

          },
          error: (err) => {

          },
          complete: () => {
            this.dialogRef.close();
          }
        })
    }
  }


  sameAddress(e: any) {
    if (e.target.checked) {
      this.employeeShipingAdd?.setValue(String(this.employeeBillingAdd?.value));
    } else {
      this.employeeShipingAdd?.setValue('');
    }
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      accountName: new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*$')]),
      empContactNo1: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      empContactNo2: new FormControl(null),
      empEmailId: new FormControl(null),
      empBillingAddress: new FormControl(null),
      empShipingAddress: new FormControl(null),
      empOpeningBalance: new FormControl(0.0),
      empAreaCode: new FormControl(null),
      empGstNo: new FormControl(null),
      empDob: new FormControl(this.date),
      empBloodGroup: new FormControl(null),
      empJobeDesignation: new FormControl(null),
      empJoiningDate: new FormControl(this.date),
      empSalaryPackage: new FormControl(null),
      empAadharNo: new FormControl(null),
      empPanNo: new FormControl(null),
    })
  }

  dialogClose() {
    this.dialogRef.close();
  }
  nameValid() {

    if (this.employeeName && this.employeeName.invalid) {
      // (document.querySelector('#name') as HTMLElement).style.borderColor = '#FF0A0A';
      // (document.querySelector('#labelName') as HTMLElement).style.color = '#FF0A0A';
      (document.querySelector('#name-span') as HTMLElement).style.color = '#FF0A0A';

    }
    else {
      (document.querySelector('#name') as HTMLElement).style.borderColor = 'black';
      (document.querySelector('#labelName') as HTMLElement).style.color = 'black';
      (document.querySelector('#name-span') as HTMLElement).style.color = 'black';
    }
  }
  mobileNoValidator() {

    if (this.empContactNo1 && this.empContactNo1.invalid) {
      // (document.querySelector('#mobile1') as HTMLElement).style.borderColor = '#FF0A0A';
      // (document.querySelector('#labelMobile1') as HTMLElement).style.color = '#FF0A0A';
      (document.querySelector('#mobile1-span') as HTMLElement).style.color = '#FF0A0A';

    }
    else {
      (document.querySelector('#mobile1') as HTMLElement).style.borderColor = 'black';
      (document.querySelector('#labelMobile1') as HTMLElement).style.color = 'black';
      (document.querySelector('#mobile1-span') as HTMLElement).style.color = 'black';
    }
  }

  openDialogAlert(alert_text1:string,alert_text2:string) {

    const dialogRef = this.dialog.open(AlertComponent, {
      width: '50%',
      height: '22%',
      data: [{alert_text1},{alert_text2}]
    });
  }


}


