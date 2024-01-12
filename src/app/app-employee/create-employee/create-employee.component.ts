import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/app-alert-message/alert/alert.component';
import { CreatePartyComponent } from 'src/app/app-party/create-party/create-party.component';
import { CustomValidation } from 'src/app/app-validator/custom-validation';
import { CustomValidationService } from 'src/app/app-validator/custom-validation-service';

import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  isGstNo = 'display:none';
  isGstIn: boolean = true;
  date = new Date();
  employeeForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: Service,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    private validationService: CustomValidationService
  ) {}
  get employeeBillingAdd() {
    return this.employeeForm.get('empBillingAddress');
  }
  get employeeShipingAdd() {
    return this.employeeForm.get('empShipingAddress');
  }

  formSubmit() {
    if (this.employeeForm.valid) {
      this.service.addEmployee(this.employeeForm?.value).subscribe({
        next: (value) => {},
        error: (err) => {},
        complete: () => {
          this.dialogRef.close();
        },
      });
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
      accountName: new FormControl('', [
        Validators.required,
        CustomValidation.customName(),
      ]),
      empContactNo1: new FormControl('', [
        Validators.required,
        CustomValidation.customMobileNo(),
      ]),
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
    });
  }
  getErrorMessageName(controlName: string): string | null {
    const control = this.employeeForm.get(controlName);
    return control
      ? this.validationService.getErrorMessageName(
          control,
          '*',
          '*',
          '*',
          '*',
          '*'
        )
      : null;
  }
  getErrorMessageMobileNumber(controlName: string): string | null {
    const control = this.employeeForm.get(controlName);
    return control
      ? this.validationService.getErrorMessageMobileNumber(
          control,
          '*',
          '*',
          '*'
        )
      : null;
  }

  dialogClose() {
    this.dialogRef.close();
  }

  openDialogAlert(alert_text1: string, alert_text2: string) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '50%',
      height: '22%',
      data: [{ alert_text1 }, { alert_text2 }],
    });
  }
}
