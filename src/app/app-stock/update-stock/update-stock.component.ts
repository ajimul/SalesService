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
import { Service } from 'src/app/services/service.service';
import { UpdateInventoryItemsDTO } from 'src/app/model/update-inventory';
import { AlertComponent } from 'src/app/app-alert-message/alert/alert.component';
import { CustomValidation } from 'src/app/app-validator/custom-validation';
import { CustomValidationService } from 'src/app/app-validator/custom-validation-service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css'],
})
export class UpdateStockComponent implements OnInit {
  formInventory!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private service: Service,
    @Inject(MAT_DIALOG_DATA) public data: { element: any },
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
    private validationService: CustomValidationService,
    public dialogRef: MatDialogRef<UpdateStockComponent>
  ) {}

  get iiId() {
    return this.formInventory.get('iiId');
  }
  get ii_ilId() {
    return this.formInventory.get('ii_ilId');
  }
  get igName() {
    return this.formInventory.get('igName');
  }
  get ilName() {
    return this.formInventory.get('ilName');
  }
  get iiQty() {
    return this.formInventory.get('iiQty');
  }
  get iiMrp() {
    return this.formInventory.get('iiMrp');
  }
  get iiPurchaseAmount() {
    return this.formInventory.get('iiPurchaseAmount');
  }
  get iiSalesAmount() {
    return this.formInventory.get('iiSalesAmount');
  }
  get iiTDPercent() {
    return this.formInventory.get('iiTDPercent');
  }
  get iiParticular() {
    return this.formInventory.get('iiParticular');
  }
  get iiHsn() {
    return this.formInventory.get('iiHsn');
  }
  get iiModelNo() {
    return this.formInventory.get('iiModelNo');
  }
  get iiUnitName() {
    return this.formInventory.get('iiUnitName');
  }
  get iiCgstPercent() {
    return this.formInventory.get('iiCgstPercent');
  }
  get iiSgstPercent() {
    return this.formInventory.get('iiSgstPercent');
  }
  get iiIgstPercent() {
    return this.formInventory.get('iiIgstPercent');
  }
  get iiNoOfService() {
    return this.formInventory.get('iiNoOfService');
  }
  get iiMonthOfWarranty() {
    return this.formInventory.get('iiMonthOfWarranty');
  }

  ngOnInit(): void {
    this.formInventory = this.fb.group({
      iiId: new FormControl(this.data.element.iiId), //inventory group id
      ii_ilId: new FormControl(this.data.element.ii_ilId), //inventory group id
      igName: new FormControl(this.data.element.igName), //inventory group name
      ilName: new FormControl(this.data.element.ilName), //inventory location
      iiQty: new FormControl(0),
      iiMrp: new FormControl(this.data.element.iiMrp, [
        Validators.required,
        CustomValidation.customDecimal(),
      ]),
      iiPurchaseAmount: new FormControl(this.data.element.iiPurchaseAmount, [
        Validators.required,
        CustomValidation.customDecimal()
      ]),
      iiSalesAmount: new FormControl(this.data.element.iiSalesAmount,[
        Validators.required,
        CustomValidation.customDecimal()
      ]),
      iiTDPercent: new FormControl(this.data.element.iiTDPercent, [
        Validators.required,
        CustomValidation.customNumber()
      ]),
      iiParticular: new FormControl(
        this.data.element.iiParticular,[
          Validators.required,
          CustomValidation.customText1()
        ]),
      iiHsn: new FormControl(this.data.element.iiHsn),
      iiModelNo: new FormControl(this.data.element.iiModelNo),
      iiUnitName: new FormControl(
        this.data.element.iiUnitName,[
          Validators.required,
          CustomValidation.customSelect()
        ]),
      iiCgstPercent: new FormControl(this.data.element.iiCgstPercent, [
        Validators.required,
        CustomValidation.customDecimal()
      ]),
      iiSgstPercent: new FormControl(this.data.element.iiSgstPercent, [
        Validators.required,
        CustomValidation.customDecimal()
      ]),
      iiIgstPercent: new FormControl(this.data.element.iiIgstPercent, [
        Validators.required,
        CustomValidation.customDecimal()
      ]),
      iiNoOfService: new FormControl(this.data.element.iiNoOfService, [
        Validators.required,
        CustomValidation.customNumber()
      ]),
      iiMonthOfWarranty: new FormControl(this.data.element.iiMonthOfWarranty, [
        Validators.required,
        CustomValidation.customNumber()
      ]),
    });
  }
  formSubmit() {
    if (this.formInventory.valid) {
      let updateInventory: UpdateInventoryItemsDTO = {
        iiId: this.iiId?.value,
        ii_ilId: this.ii_ilId?.value,
        iiQty: Number(this.iiQty?.value),
        iiMrp: this.iiMrp?.value,
        iiPurchaseAmount: this.iiPurchaseAmount?.value,
        iiSalesAmount: this.iiSalesAmount?.value,
        iiTDPercent: this.iiTDPercent?.value,
        iiParticular: this.iiParticular?.value,
        iiHsn: this.iiHsn?.value,
        iiModelNo: this.iiModelNo?.value,
        iiUnitName: this.iiUnitName?.value,
        iiCgstPercent: this.iiCgstPercent?.value,
        iiSgstPercent: this.iiSgstPercent?.value,
        iiIgstPercent: this.iiIgstPercent?.value,
        iiNoOfService: this.iiNoOfService?.value,
        iiMonthOfWarranty: this.iiMonthOfWarranty?.value,
      };

      this.service.updateInventory(updateInventory).subscribe({
        next: (value) => {},
        error: (e) => {},
        complete: () => {
          this.dialogRef.close();
        },
      });
    }
  }

  getErrorMessageItemNames(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageText1(
          control,
          '*',
          'Blank spaces are not allowed.',
          'Name must be at least 3 characters long.'
        )
      : null;
  }
  getErrorMessageSelectIgroup(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageSelect(control, '*')
      : null;
  }
  getErrorMessageSelectIlocation(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageSelect(control, '*')
      : null;
  }
  getErrorMessageSelectUnit(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageSelect(control, '*')
      : null;
  }
  getErrorMessageMrp(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageNumberDecimal(
          control,
          '*',
          '*',
          '*',
          '*'
        )
      : null;
  }
  getErrorMessagePurchase(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageNumberDecimal(
          control,
          '*',
          '*',
          '*',
          '*'
        )
      : null;
  }
  getErrorMessageSales(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageNumberDecimal(
          control,
          '*',
          '*',
          '*',
          '*'
        )
      : null;
  }
  getErrorMessageCGST(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageNumberDecimal(
          control,
          '*',
          '*',
          '*',
          '*'
        )
      : null;
  }
  getErrorMessageSGST(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageNumberDecimal(
          control,
          '*',
          '*',
          '*',
          '*'
        )
      : null;
  }
  getErrorMessageIGST(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageNumberDecimal(
          control,
          '*',
          '*',
          '*',
          '*'
        )
      : null;
  }
  getErrorMessageMonthOfService(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageNumber(control, '*', '*')
      : null;
  }
  getErrorMessageWarranty(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageNumber(control, '*', '*')
      : null;
  }
  getErrorMessageTradeDiscount(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageNumber(control, '*', '*')
      : null;
  }

  openDialogAlert(alert_text1: string, alert_text2: string) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '50%',
      height: '20%',
      data: [{ alert_text1 }, { alert_text2 }],
    });
  }
}
