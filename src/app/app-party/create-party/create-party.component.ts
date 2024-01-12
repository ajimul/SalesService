import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/app-alert-message/alert/alert.component';
import { CustomValidation } from 'src/app/app-validator/custom-validation';
import { CustomValidationService } from 'src/app/app-validator/custom-validation-service';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css'],
})
export class CreatePartyComponent implements OnInit {
  isGstNo = 'display:none';
  isGstIn: boolean = true;
  date = new Date();
  partyForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: Service,
    public dialogRef: MatDialogRef<CreatePartyComponent>,
    private dialog: MatDialog,
    private validationService: CustomValidationService
  ) {}

  get partyBillingAdd() {
    return this.partyForm.get('partyBillingAddress');
  }
  get partyShipingAdd() {
    return this.partyForm.get('partyShipingAddress');
  }
  formSubmit() {
    if (!this.isGstIn) {
      this.partyForm.value.partyGstNo = '';
    }

    if (this.partyForm.valid) {
      this.service.addPartyAccounts(this.partyForm?.value).subscribe({
        next: (value) => {},
        error: (e) => {
          let ee: any = e;
          alert(ee.value);
        },
        complete: () => {
          this.dialogRef.close();
        },
      });
    }
  }
  sameAddress(e: any) {
    if (e.target.checked) {
      this.partyShipingAdd?.setValue(String(this.partyBillingAdd?.value));
    } else {
      this.partyShipingAdd?.setValue('');
    }
  }

  ngOnInit(): void {
    this.partyForm = this.fb.group({
      accountName: new FormControl('', [
        Validators.required,
        CustomValidation.customName(),
      ]),
      partyContactNo1: new FormControl('', [
        Validators.required,
        CustomValidation.customMobileNo(),
      ]),
      partyContactNo2: new FormControl(),
      partyEmailId: new FormControl(),
      partyGstNo: new FormControl(),
      partyBillingAddress: new FormControl(),
      partyShipingAddress: new FormControl(),
      partyOpeningBalance: new FormControl(0.0),
      partyAreaCode: new FormControl(),
      partyDob: new FormControl(this.date),
      partyBloodGroup: new FormControl(),
      partyAadharNo: new FormControl(),
      partyPanNo: new FormControl(),
    });
  }
  isGstRegister(getValue: any) {
    if (getValue === 'Register') {
      this.isGstNo = 'display:inline';
      this.isGstIn = true;
    } else {
      this.isGstNo = 'display:none';
      this.isGstIn = false;
    }
  }
  dialogClose() {
    this.dialogRef.close();
  }

  // Custom Form validator
  getErrorMessageName(controlName: string): string | null {
    const control = this.partyForm.get(controlName);
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
    const control = this.partyForm.get(controlName);
    return control
      ? this.validationService.getErrorMessageMobileNumber(
          control,
          '*',
          '*',
          '*'
        )
      : null;
  }

  openDialogAlert(alert_text1: string, alert_text2: string) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '50%',
      height: '20%',
      data: [{ alert_text1 }, { alert_text2 }],
    });
  }

  contact = {
    name: 'Ajay',
    email: 'ajay933jpg"gmail.com',
    contact: '8670731872',
  }; // Initialize with empty values
  contacts: any[] = [];

  saveContact() {
    // Assuming you have a method in your ContactService to save the contact
    this.service.saveContact(this.contact).subscribe({
      next: (value) => {
        alert(value);
      },
      error: (e) => {
        let ee: any = e;
        alert(ee.value);
      },
      complete: () => {},
    });
  }
}
