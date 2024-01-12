import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AlertComponent } from 'src/app/app-alert-message/alert/alert.component';
import { CustomValidation } from 'src/app/app-validator/custom-validation';
import { CustomValidationService } from 'src/app/app-validator/custom-validation-service';

import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-update-party',
  templateUrl: './update-party.component.html',
  styleUrls: ['./update-party.component.css'],
})
export class UpdatePartyComponent implements OnInit {
  isGstNo = 'display:none';
  isGstIn: boolean = true;
  // date = new Date;
  partyForm!: FormGroup;
  constructor(
    private service: Service,
    @Inject(MAT_DIALOG_DATA) public data: { element: any },
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdatePartyComponent>,
    private validationService: CustomValidationService
  ) {}

  get partyId() {
    return this.partyForm.get('accountsId');
  }
  get partyName() {
    return this.partyForm.get('accountName');
  }
  get partyContact1() {
    return this.partyForm.get('partyContactNo1');
  }
  get partyContact2() {
    return this.partyForm.get('partyContactNo');
  }
  get partyEmail() {
    return this.partyForm.get('partyEmailId');
  }
  get partyOpeningBalance() {
    return this.partyForm.get('partyOpeningBalance');
  }
  get partygstNo() {
    return this.partyForm.get('partyGstNo');
  }
  get partyBillingAdd() {
    return this.partyForm.get('partyBillingAddress');
  }
  get partyShipingAdd() {
    return this.partyForm.get('partyShipingAddress');
  }
  get partyDob() {
    return this.partyForm.get('partyDob');
  }
  get partyBloodGroup() {
    return this.partyForm.get('partyBloodGroup');
  }
  get partyAadharNo() {
    return this.partyForm.get('partyAadharNo');
  }
  get partyPanNo() {
    return this.partyForm.get('partyPanNo');
  }

  formSubmit() {
    if (!this.isGstIn) {
      this.partyForm.value.partyGstNo = '';
    }
    if (this.partyForm.valid) {
      this.service.updatePartyAccounts(this.partyForm?.value).subscribe({
        next: (value) => {},
        error: (e) => {},
        complete: () => {
          this.dialogRef.close();
        },
      });
    }
  }

  sameAddress(e: any) {
    if (e.target.checked) {
      this.partyShipingAdd?.setValue(this.partyBillingAdd?.value);
    } else {
      this.partyShipingAdd?.setValue('');
    }
  }

  ngOnInit(): void {
    console.log(this.data.element.accountId);
    this.partyForm = this.fb.group({
      accountId: new FormControl(this.data.element.accountId),
      accountName: new FormControl(this.data.element.accountName, [
        Validators.required,
        CustomValidation.customName(),
      ]),
      partyDetailsId: new FormControl(this.data.element.partyDetailsId),
      party_ac_refId: new FormControl(this.data.element.party_ac_refId),
      partyContactNo1: new FormControl(this.data.element.partyContactNo1, [
        Validators.required,
        CustomValidation.customMobileNo(),
      ]),
      partyContactNo2: new FormControl(this.data.element.partyContactNo2),
      partyEmailId: new FormControl(this.data.element.partyEmailId),
      partyGstNo: new FormControl(this.data.element.partyGstNo),
      partyBillingAddress: new FormControl(
        this.data.element.partyBillingAddress
      ),
      partyShipingAddress: new FormControl(
        this.data.element.partyShipingAddress
      ),
      partyOpeningBalance: new FormControl(0.0),
      partyAreaCode: new FormControl(''),
      partyDob: new FormControl(this.data.element.partyDob),
      partyBloodGroup: new FormControl(this.data.element.partyBloodGroup),
      partyAadharNo: new FormControl(this.data.element.partyAadharNo),
      partyPanNo: new FormControl(this.data.element.partyPanNo),
    });
  }
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

  openDialogAlert(alert_text1: string, alert_text2: string) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '50%',
      height: '20%',
      data: [{ alert_text1 }, { alert_text2 }],
    });
  }
}
