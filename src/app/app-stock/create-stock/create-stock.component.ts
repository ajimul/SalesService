import { CdkRow } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { AlertComponent } from 'src/app/app-alert-message/alert/alert.component';
import { CreateItemsLocationComponent } from 'src/app/app-create-Items-location/create-items-location/create-items-location.component';
import { CustomValidation } from 'src/app/app-validator/custom-validation';
import { CustomValidationService } from 'src/app/app-validator/custom-validation-service';
import { CreateItemsGroupComponent } from 'src/app/create-items-group/create-items-group/create-items-group.component';
import {
  AddInventoryDTO,
  AddInventoryGroupDTO,
  AddInventoryItemsDTO,
} from 'src/app/model/add-inventory';
import { InventoryGroupLocation } from 'src/app/model/inventory-group';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css'],
})
export class CreateStockComponent implements OnInit {
  itemGroup: AddInventoryGroupDTO[] = [];
  itemGroupLocation: InventoryGroupLocation[] = [];
  formInventory!: FormGroup;
  constructor(
    private service: Service,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
    private validationService: CustomValidationService,
    public dialogRef: MatDialogRef<CreateStockComponent>
  ) {}

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
      igName: new FormControl('', [
        Validators.required,
        CustomValidation.customSelect()
      ]),
      ilName: new FormControl('', [
        Validators.required,
        CustomValidation.customSelect()
      ]),
      iiQty:  new FormControl(0, [
        Validators.required,
        CustomValidation.customNumber()
      ]),

      iiMrp: new FormControl('', [
        Validators.required,
        CustomValidation.customDecimal()
      ]),

      iiPurchaseAmount: new FormControl('', [
        Validators.required,
        CustomValidation.customDecimal()
      ]),
      iiSalesAmount: new FormControl('', [
        Validators.required,
        CustomValidation.customDecimal()
      ]),
      iiTDPercent: new FormControl('', [
        Validators.required,
        CustomValidation.customNumber()
      ]),
      iiParticular: new FormControl('', [
        Validators.required,
        CustomValidation.customText1()
      ]),
      iiHsn: new FormControl(),
      iiModelNo: new FormControl(),
      iiUnitName: new FormControl(null, [
        Validators.required,
        CustomValidation.customSelect()
      ]),
      iiCgstPercent: new FormControl('', [
        Validators.required,
        CustomValidation.customDecimal()
      ]),
      iiSgstPercent: new FormControl('', [
        Validators.required,
        CustomValidation.customDecimal()
      ]),
      iiIgstPercent: new FormControl('', [
        Validators.required,
        CustomValidation.customDecimal()
      ]),
      iiNoOfService: new FormControl(4, [
        Validators.required,
        CustomValidation.customNumber()
      ]),
      iiMonthOfWarranty: new FormControl(12, [
        Validators.required,
        CustomValidation.customNumber()
      ]),
    });

    this.getItemsGroupList();
    this.getItemsLocationList();
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
  getErrorMessageQty(controlName: string): string | null {
    const control = this.formInventory.get(controlName);
    return control
      ? this.validationService.getErrorMessageNumber(
          control,
          '*',
          '*'
        )
      : null;
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (isNaN(value)) {
        return { number: true };
      }
      return null;
    };
  }
  formSubmit() {
    if (this.formInventory.valid) {
      let Inventory: AddInventoryDTO = {
        igName: this.igName?.value,
        inventoryLocations: [
          {
            ilName: this.ilName?.value,
            inventoryItems: [
              {
                iiQty: this.iiQty?.value,
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
              },
            ],
          },
        ],
      };

      this.service.addInventory(Inventory).subscribe({
        next: (value) => {},
        error: (e) => {},
        complete: () => {
          this.dialogRef.close();
        },
      });
    }
  }

  getItemsGroupList() {
    this.service.getItemsGroupList().subscribe({
      next: (value) => {
        this.itemGroup = value;
      },
      error: () => {},
      complete: () => {},
    });
  }
  getItemsLocationList() {
    this.service.getItemsLocationList().subscribe({
      next: (value) => {
        this.itemGroupLocation = value;
      },
      error: () => {},
      complete: () => {},
    });
  }
  openDialogCreateitemsGroup() {
    {
      const dialogRef = this.dialog.open(CreateItemsGroupComponent, {
        width: '50%',
        height: '50%',
        data: [],
      });
      dialogRef.afterClosed().subscribe((response: any) => {
        this.getItemsGroupList();
      });
    }
  }
  openDialogCreateitemsGroupLocation() {
    {
      const dialogRef = this.dialog.open(CreateItemsLocationComponent, {
        width: '50%',
        height: '50%',
        data: [],
      });
      dialogRef.afterClosed().subscribe((response: any) => {
        this.getItemsLocationList();
      });
    }
  }
  openDialogAlert(alert_text1: string, alert_text2: string) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '50%',
      height: '20%',
      data: [{ alert_text1 }, { alert_text2 }],
    });
  }
}
