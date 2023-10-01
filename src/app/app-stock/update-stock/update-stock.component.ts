import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Service } from 'src/app/services/service.service';
import { UpdateInventoryItemsDTO } from 'src/app/model/update-inventory';
import { AlertComponent } from 'src/app/app-alert-message/alert/alert.component';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {
  formInventory!: FormGroup;

  constructor(public dialog: MatDialog,
    private service: Service,
    @Inject(MAT_DIALOG_DATA) public data: { element: any },
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateStockComponent>) { }

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
      iiId: new FormControl(this.data.element.iiId),//inventory group id
      ii_ilId: new FormControl(this.data.element.ii_ilId),//inventory group id
      igName: new FormControl(this.data.element.igName),//inventory group name
      ilName: new FormControl(this.data.element.ilName),//inventory location
      iiQty: new FormControl(0),
      iiMrp: new FormControl(this.data.element.iiMrp, [Validators.required, Validators.pattern('^[-+]?[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?$')]),
      iiPurchaseAmount: new FormControl(this.data.element.iiPurchaseAmount, [Validators.required, Validators.pattern('^[-+]?[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?$')]),
      iiSalesAmount: new FormControl(this.data.element.iiSalesAmount, [Validators.required, Validators.pattern('^[-+]?[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?$')]),
      iiTDPercent: new FormControl(this.data.element.iiTDPercent, [Validators.required, Validators.pattern('^[0-9][0-9]*$')]),
      iiParticular: new FormControl(this.data.element.iiParticular, Validators.required),
      iiHsn: new FormControl(this.data.element.iiHsn),
      iiModelNo: new FormControl(this.data.element.iiModelNo),
      iiUnitName: new FormControl(this.data.element.iiUnitName, Validators.required),
      iiCgstPercent: new FormControl(this.data.element.iiCgstPercent, [Validators.required, Validators.pattern('^[0-9][0-9]*$')]),
      iiSgstPercent: new FormControl(this.data.element.iiSgstPercent, [Validators.required, Validators.pattern('^[0-9][0-9]*$')]),
      iiIgstPercent: new FormControl(this.data.element.iiIgstPercent, [Validators.required, Validators.pattern('^[0-9][0-9]*$')]),
      iiNoOfService: new FormControl(this.data.element.iiNoOfService, [Validators.required, Validators.pattern('^[0-9][0-9]*$')]),
      iiMonthOfWarranty: new FormControl(this.data.element.iiMonthOfWarranty, [Validators.required, Validators.pattern('^[0-9][0-9]*$')]),
    })
  }
  formSubmit() {

    if (this.formInventory.invalid) {
      if (this.iiMonthOfWarranty && this.iiMonthOfWarranty.invalid) {
        // console.log('iiMonthOfWarranty.invalid');
         (document.querySelector('#label-warranty') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#warranty-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#iiMonthOfWarranty') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("The month of warranty should be '0' or greater than '0'", "Please enter a valid range to continue...");
       }
       else {
         (document.querySelector('#label-warranty') as HTMLElement).style.color = 'black';
         (document.querySelector('#warranty-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#iiMonthOfWarranty') as HTMLElement).style.borderColor = 'black';
   
       }
       if (this.iiNoOfService && this.iiNoOfService.invalid) {
        // console.log('iiNoOfService.invalid');
         (document.querySelector('#label-service') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#service-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#iiNoOfService') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("The number of services should be '0' or greater than '0'", "Please enter a valid range to continue...");
       }
       else {
         (document.querySelector('#label-service') as HTMLElement).style.color = 'black';
         (document.querySelector('#service-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#iiNoOfService') as HTMLElement).style.borderColor = 'black';
   
       }
  
       if (this.iiTDPercent && this.iiTDPercent.invalid) {
        // console.log('iiTDPercent.invalid');
         (document.querySelector('#label-td') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#td-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#inventoryItemsTDPercent') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("Enter trade discount amount to continue...", "");
       }
       else {
         (document.querySelector('#label-td') as HTMLElement).style.color = 'black';
         (document.querySelector('#td-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#inventoryItemsTDPercent') as HTMLElement).style.borderColor = 'black';
       }
   
       if (this.iiIgstPercent && this.iiIgstPercent.invalid) {
        // console.log('iiIgstPercent.invalid');
         (document.querySelector('#label-igst') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#igst-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#inventoryItemsIgstPercent') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("Enter IGST amount to continue...", "");
   
       }
       else {
         (document.querySelector('#label-igst') as HTMLElement).style.color = 'black';
         (document.querySelector('#igst-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#inventoryItemsIgstPercent') as HTMLElement).style.borderColor = 'black';
       }
       if (this.iiSgstPercent && this.iiSgstPercent.invalid) {
        // console.log('iiSgstPercent.invalid');
         (document.querySelector('#label-sgst') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#sgst-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#inventoryItemsSgstPercent') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("Enter SGST amount to continue...", "");
   
       }
       else {
         (document.querySelector('#label-sgst') as HTMLElement).style.color = 'black';
         (document.querySelector('#sgst-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#inventoryItemsSgstPercent') as HTMLElement).style.borderColor = 'black';
       }
       if (this.iiCgstPercent && this.iiCgstPercent.invalid) {
        // console.log('iiCgstPercent.invalid');
         (document.querySelector('#label-cgst') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#cgst-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#inventoryItemsCgstPercent') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("Enter CGST amount to continue...", "");
   
       }
       else {
         (document.querySelector('#label-cgst') as HTMLElement).style.color = 'black';
         (document.querySelector('#cgst-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#inventoryItemsCgstPercent') as HTMLElement).style.borderColor = 'black';
       }
       if (this.iiSalesAmount && this.iiSalesAmount.invalid) { 
             // console.log('iiSalesAmount.invalid');
         (document.querySelector('#label-salesPrice') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#salesPrice-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#inventoryItemsSalesAmount') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("Enter Sales amount to continue...", "");
   
       }
       else {
         (document.querySelector('#label-salesPrice') as HTMLElement).style.color = 'black';
         (document.querySelector('#salesPrice-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#inventoryItemsSalesAmount') as HTMLElement).style.borderColor = 'black';
       }
       if (this.iiPurchaseAmount && this.iiPurchaseAmount.invalid) {
        // console.log('iiPurchaseAmount.invalid');
         (document.querySelector('#label-purchasePrice') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#purchasePrice-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#inventoryItemsPurchaseAmount') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("Enter purchase amount to continue...", "");
   
     
       }
       else {
         (document.querySelector('#label-purchasePrice') as HTMLElement).style.color = 'black';
         (document.querySelector('#purchasePrice-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#inventoryItemsPurchaseAmount') as HTMLElement).style.borderColor = 'black';
       }
       if (this.iiMrp && this.iiMrp.invalid) {
        // console.log('iiMrp.invalid');
         (document.querySelector('#label-mrp') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#mrp-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#inventoryItemsMrp') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("Enter MRP amount to continue...", "");
   
     
       }
       else {
         (document.querySelector('#label-mrp') as HTMLElement).style.color = 'black';
         (document.querySelector('#mrp-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#inventoryItemsMrp') as HTMLElement).style.borderColor = 'black';
       }
       if (this.iiUnitName && this.iiUnitName.invalid) {
        // console.log('iiUnitName.invalid');
         (document.querySelector('#label-unit') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#unit-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#itemUnit') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("Select a measuring unit to continue...", "");
   
     
       }
       else {
         (document.querySelector('#label-unit') as HTMLElement).style.color = 'black';
         (document.querySelector('#unit-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#itemUnit') as HTMLElement).style.borderColor = 'black';
       }
       if (this.iiParticular && this.iiParticular.invalid) {
        // console.log('iiParticular.invalid');
         (document.querySelector('#label-stockName') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#stockName-span') as HTMLElement).style.color = '#FF0A0A';
         (document.querySelector('#inventoryItemsParticular') as HTMLElement).style.borderColor = '#FF0A0A';
         this.openDialogAlert("Enter the goods name to continue...", "");
   
     
       }
       else {
         (document.querySelector('#label-stockName') as HTMLElement).style.color = 'black';
         (document.querySelector('#stockName-span') as HTMLElement).style.color = 'black';
         (document.querySelector('#inventoryItemsParticular') as HTMLElement).style.borderColor = 'black';
       }

    }
    else {
      let updateInventory: UpdateInventoryItemsDTO= {
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
      }

      this.service.UpdateInventory(updateInventory)
        .subscribe({
          next: (value) => {

          },
          error: (e) => {

          },
          complete: () => {
            this.dialogRef.close();
          },
        })
    }
  }

  openDialogAlert(alert_text1: string, alert_text2: string) {

    const dialogRef = this.dialog.open(AlertComponent, {
      width: '50%',
      height: '20%',
      data: [{ alert_text1 }, { alert_text2 }]
    });
  }

  warrantyValidator() {

    if (this.iiMonthOfWarranty && this.iiMonthOfWarranty.invalid) {
      console.log('warrantyValidator');
      (document.querySelector('#warranty-span') as HTMLElement).style.color = '#FF0A0A';
    }
    else {
      (document.querySelector('#label-warranty') as HTMLElement).style.color = 'black';
      (document.querySelector('#warranty-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#iiMonthOfWarranty') as HTMLElement).style.borderColor = 'black';

    }
  }
  serviceValidator() {

    if (this.iiNoOfService && this.iiNoOfService.invalid) {
      console.log('warrantyValidator');
      (document.querySelector('#service-span') as HTMLElement).style.color = '#FF0A0A';
    }
    else {
      (document.querySelector('#label-service') as HTMLElement).style.color = 'black';
      (document.querySelector('#service-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#iiNoOfService') as HTMLElement).style.borderColor = 'black';

    }
  }
  // locationValidator(){
  //   if (this.ilName && this.ilName.invalid) {
  //     (document.querySelector('#location-span') as HTMLElement).style.color = '#FF0A0A';
  //   }
  //   else {
  //     (document.querySelector('#label-location') as HTMLElement).style.color = 'black';
  //     (document.querySelector('#location-span') as HTMLElement).style.color = 'black';
  //     (document.querySelector('#inventoryLocationName') as HTMLElement).style.borderColor = 'black';

  //   }
  // }
  // stockGroupValidator(){
  //   if (this.igName && this.igName.invalid) {
  //     (document.querySelector('#group-span') as HTMLElement).style.color = '#FF0A0A';
  //   }
  //   else {
  //     (document.querySelector('#label-group') as HTMLElement).style.color = 'black';
  //     (document.querySelector('#group-span') as HTMLElement).style.color = 'black';
  //     (document.querySelector('#inventoryGroupName') as HTMLElement).style.borderColor = 'black';

  //   }

  // }
  tdDiscountValidator() {
    if (this.iiTDPercent && this.iiTDPercent.invalid) {
      (document.querySelector('#td-span') as HTMLElement).style.color = '#FF0A0A';
    }
    else {
      (document.querySelector('#label-td') as HTMLElement).style.color = 'black';
      (document.querySelector('#td-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#inventoryItemsTDPercent') as HTMLElement).style.borderColor = 'black';
    }
  }
  igstValidator() {
    if (this.iiIgstPercent && this.iiIgstPercent.invalid) {
      (document.querySelector('#igst-span') as HTMLElement).style.color = '#FF0A0A';

    }
    else {
      (document.querySelector('#label-igst') as HTMLElement).style.color = 'black';
      (document.querySelector('#igst-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#inventoryItemsIgstPercent') as HTMLElement).style.borderColor = 'black';
    }
  }

  sgstValidator() {
    if (this.iiSgstPercent && this.iiSgstPercent.invalid) {
      (document.querySelector('#sgst-span') as HTMLElement).style.color = '#FF0A0A';

    }
    else {
      (document.querySelector('#label-sgst') as HTMLElement).style.color = 'black';
      (document.querySelector('#sgst-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#inventoryItemsSgstPercent') as HTMLElement).style.borderColor = 'black';
    }
  }
  cgstValidator() {
    if (this.iiCgstPercent && this.iiCgstPercent.invalid) {
      (document.querySelector('#cgst-span') as HTMLElement).style.color = '#FF0A0A';

    }
    else {
      (document.querySelector('#label-cgst') as HTMLElement).style.color = 'black';
      (document.querySelector('#cgst-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#inventoryItemsCgstPercent') as HTMLElement).style.borderColor = 'black';
    }
  }
  salesPriceValidator() {
    if (this.iiSalesAmount && this.iiSalesAmount.invalid) {
      (document.querySelector('#salesPrice-span') as HTMLElement).style.color = '#FF0A0A';

    }
    else {
      (document.querySelector('#label-salesPrice') as HTMLElement).style.color = 'black';
      (document.querySelector('#salesPrice-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#inventoryItemsSalesAmount') as HTMLElement).style.borderColor = 'black';
    }
  }
  purchasePriceValidator() {
    if (this.iiPurchaseAmount && this.iiPurchaseAmount.invalid) {
      (document.querySelector('#purchasePrice-span') as HTMLElement).style.color = '#FF0A0A';

    }
    else {
      (document.querySelector('#label-purchasePrice') as HTMLElement).style.color = 'black';
      (document.querySelector('#purchasePrice-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#inventoryItemsPurchaseAmount') as HTMLElement).style.borderColor = 'black';
    }
  }
  mrpValidator() {
    if (this.iiMrp && this.iiMrp.invalid) {
      (document.querySelector('#mrp-span') as HTMLElement).style.color = '#FF0A0A';


    }
    else {
      (document.querySelector('#label-mrp') as HTMLElement).style.color = 'black';
      (document.querySelector('#mrp-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#inventoryItemsMrp') as HTMLElement).style.borderColor = 'black';
    }
  }
  unitValidator() {
    if (this.iiUnitName && this.iiUnitName.invalid) {
      (document.querySelector('#unit-span') as HTMLElement).style.color = '#FF0A0A';
    }
    else {
      (document.querySelector('#label-unit') as HTMLElement).style.color = 'black';
      (document.querySelector('#unit-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#itemUnit') as HTMLElement).style.borderColor = 'black';
    }
  }
  stockNameValidator() {
    if (this.iiParticular && this.iiParticular.invalid) {
      (document.querySelector('#stockName-span') as HTMLElement).style.color = '#FF0A0A';
    }
    else {
      (document.querySelector('#label-stockName') as HTMLElement).style.color = 'black';
      (document.querySelector('#stockName-span') as HTMLElement).style.color = 'black';
      (document.querySelector('#inventoryItemsParticular') as HTMLElement).style.borderColor = 'black';
    }
  }
}
