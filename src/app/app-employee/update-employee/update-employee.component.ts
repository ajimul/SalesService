import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/app-alert-message/alert/alert.component';
import { EmployeeDetailsDTO } from 'src/app/model/employee';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  isGstNo = "display:none";
  isGstIn: boolean = true;
  employeeForm!:FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: Service,
    private dialog:MatDialog,
    public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { element: any },
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
    this.service.UpdateEmployee(this.employeeForm.value)
      .subscribe({
        next: (value) => {
        },
        error: (err) => {
        },
        complete: () => {
          this.dialogRef.close();
        }
      })}
  }



  sameAddress(e: any) {
    if (e.target.checked) {
      this.employeeShipingAdd?.setValue(this.employeeBillingAdd?.value);
    } else {
      this.employeeShipingAdd?.setValue('');
    }
  }

  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      accountId: new FormControl(this.data.element.accountId),
      accountName: new FormControl(this.data.element.accountName,[Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*$')]),
      empDetailsId: new FormControl(this.data.element.empDetailsId),
      emp_ac_refId: new FormControl(this.data.element.emp_ac_refId),
      empContactNo1: new FormControl(this.data.element.empContactNo1,[Validators.required, Validators.pattern('^[0-9]{10}$')]),
      empContactNo2: new FormControl(this.data.element.empContactNo2),
      empEmailId: new FormControl(this.data.element.empEmailId),
      empBillingAddress: new FormControl(this.data.element.empBillingAddress),
      empShipingAddress: new FormControl(this.data.element.empShipingAddress),
      empOpeningBalance: new FormControl(0.0),
      empAreaCode: new FormControl(this.data.element.empAreaCode),
      empGstNo: new FormControl(""),
      empDob: new FormControl(this.data.element.empDob),
      empBloodGroup: new FormControl(this.data.element.empBloodGroup),
      empJobeDesignation: new FormControl(this.data.element.empJobeDesignation),
      empJoiningDate: new FormControl(this.data.element.empJoiningDate),
      empSalaryPackage: new FormControl(this.data.element.empSalaryPackage),
      empAadharNo: new FormControl(this.data.element.empAadharNo),
      empPanNo: new FormControl(this.data.element.empPanNo),
  
    }) 

    let checkbox = document.getElementById('sameAddress') as HTMLElement;
    if (this.employeeBillingAdd?.value !== null && this.employeeShipingAdd?.value !== null) {
      checkbox.setAttribute('checked', 'true');
    }


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