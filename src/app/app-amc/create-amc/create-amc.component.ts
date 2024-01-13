import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreatePartyComponent } from 'src/app/app-party/create-party/create-party.component';
import { UpdatePartyComponent } from 'src/app/app-party/update-party/update-party.component';
import { CreateStockComponent } from 'src/app/app-stock/create-stock/create-stock.component';
import { UpdateStockComponent } from 'src/app/app-stock/update-stock/update-stock.component';
import { AmcServiceEmi } from 'src/app/model/amc';
import {
  AddInventoryItemsDTO,
  AddInventoryJournalDTO,
} from 'src/app/model/add-inventory';
import { Emi } from 'src/app/model/emi';
import { PartyDetailsDTO } from 'src/app/model/party';
import { Product } from 'src/app/model/product';
import { ProductServices } from 'src/app/model/product-service';
import { Products } from 'src/app/model/products';
import { TaxableValue } from 'src/app/model/tax';
import { TransectionalAccounts } from 'src/app/model/transactional-account';
import { User } from 'src/app/model/user';
import { Service } from 'src/app/services/service.service';
import { EmployeeDetailsDTO } from 'src/app/model/employee';
import { CustomValidationService } from 'src/app/app-validator/custom-validation-service';
import { CustomValidation } from 'src/app/app-validator/custom-validation';

let taxableValue: TaxableValue[] = [];
let produtcs: Products[] = [];
// Emi and Product Service Code
let emi: Emi[] = [];
let productServices: ProductServices[] = [];
// let productServices: any[] = [];
// End emi
let isEnterKeypress: boolean = false;
@Component({
  selector: 'app-create-amc',
  templateUrl: './create-amc.component.html',
  styleUrls: ['./create-amc.component.css'],
  providers: [DatePipe],
})
export class CreateAmcComponent implements OnInit {
  amcVoucherForm!: FormGroup;
  emiForm!: FormGroup;
  amcItems!: FormGroup;

  accountList: any[] = [];
  // user: User[] = [];
  employee: EmployeeDetailsDTO[] = [];
  party: PartyDetailsDTO[] = [];
  currentDate = new Date();
  datex = new Date(this.currentDate);
  invoiceNo = 101;
  partyIndex = -1;
  accountId!: number;
  accountName: any = ''; //field binding
  listAccount: any = '';
  addressBillingFrom: any = ''; //field binding
  addressShipingFrom: any = ''; //field binding
  totalQty: number = 0;
  totalAmount: number = 0;
  payableAmount: number = 0;

  partyAddressDisplay = 'display:none'; //billing From & shiping From def(flex)
  partyDisplay = 'display:none'; //table def(block)
  stockDisplay = 'display:none'; //table def(block)
  addStockbtn = 'display:block'; //add product button def(block)
  produtcsDisplay = 'display:block'; //product table def(block)
  formField = 'display:block'; //product table def(block)
  subTotal = 'display:block'; //product table def(block)
  taxableTableDisplay = 'display:flex'; //product table def(flex)
  submitBtnDisplay = 'display:block';

  filterProductName = '';
  // partySelected: boolean = false;
  stockEditBtn: boolean = false;
  partyEditBtn: boolean = false;

  emiProcessingFee: number = 0;
  downPaymet: number = 0;
  installmentRangeNumber: number = 4;
  installmentAmount: number = 0;

  dilogData: any;
  partyColumns = [
    'accountName',
    'accountId',
    'partyContactNo1',
    'partyEmailId',
    'partyBillingAddress',
    'partyShipingAddress',
    'action',
  ];
  getData: any;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  addAmcItems() {
    if (!this.stockEditBtn) {
      this.refreshPage();

      if (
        Number(this.amcItems.get('amcProductCgstPercent')?.value) !== 0 &&
        Number(this.amcItems.get('amcProductSgstPercent')?.value) !== 0 &&
        Number(this.amcItems.get('amcProductIgstPercent')?.value) === 0
      ) {
        produtcs.push({
          productNo: 0,
          productName: String(this.amcItems.get('amcProductName')?.value),
          productModel: String(this.amcItems.get('amcProductModelNo')?.value),
          productSerialNo: String(
            this.amcItems.get('amcProductSerialNo')?.value
          ),
          productAge: Number(this.amcItems.get('amcProductAge')?.value),
          productValue: Number(this.amcItems.get('amcProductValue')?.value),
          productHsn: String(this.amcItems.get('amcProductHsn')?.value),
          productQty: 1,
          productMrp: 0,
          productSalesPrice: Number(
            this.amcItems.get('amcProductValue')?.value
          ), //without tax
          productPurchasePrice: Number(
            this.amcItems.get('amcProductValue')?.value
          ), //without tax
          productPer: 1,
          productDiscount: 0,
          productCgstPercent: Number(
            this.amcItems.get('amcProductCgstPercent')?.value
          ),
          productSgstPercent: Number(
            this.amcItems.get('amcProductSgstPercent')?.value
          ),
          productIgstPercent: Number(
            this.amcItems.get('amcProductIgstPercent')?.value
          ),
          productFinalGst:
            Number(this.amcItems.get('amcProductCgstPercent')?.value) +
            Number(this.amcItems.get('amcProductSgstPercent')?.value),
          // productFinalGst: 50,
          productTotalAmount: Number(
            this.amcItems.get('amcProductValue')?.value
          ), //without tax
          productNoOfService: Number(
            this.amcItems.get('amcProductNoService')?.value
          ),
          productMonthOfWarranty: Number(
            this.amcItems.get('amcProductWarranty')?.value
          ),
        });
      } else if (
        Number(this.amcItems.get('amcProductCgstPercent')?.value) === 0 &&
        Number(this.amcItems.get('amcProductSgstPercent')?.value) === 0 &&
        Number(this.amcItems.get('amcProductIgstPercent')?.value) !== 0
      ) {
        produtcs.push({
          productNo: 0,
          productName: String(this.amcItems.get('amcProductName')?.value),
          productModel: String(this.amcItems.get('amcProductModelNo')?.value),
          productSerialNo: String(
            this.amcItems.get('amcProductSerialNo')?.value
          ),
          productAge: Number(this.amcItems.get('amcProductAge')?.value),
          productValue: Number(this.amcItems.get('amcProductValue')?.value),
          productHsn: String(this.amcItems.get('amcProductHsn')?.value),
          productQty: 1,
          productMrp: 0,
          productSalesPrice: Number(
            this.amcItems.get('amcProductValue')?.value
          ), //without tax
          productPurchasePrice: Number(
            this.amcItems.get('amcProductValue')?.value
          ), //without tax
          productPer: 1,
          productDiscount: 0,
          productCgstPercent: Number(
            this.amcItems.get('amcProductCgstPercent')?.value
          ),
          productSgstPercent: Number(
            this.amcItems.get('amcProductSgstPercent')?.value
          ),
          productIgstPercent: Number(
            this.amcItems.get('amcProductIgstPercent')?.value
          ),
          productFinalGst: Number(
            this.amcItems.get('amcProductIgstPercent')?.value
          ),
          // productFinalGst: 100,
          productTotalAmount: Number(
            this.amcItems.get('amcProductValue')?.value
          ), //without tax
          productNoOfService: Number(
            this.amcItems.get('amcProductNoService')?.value
          ),
          productMonthOfWarranty: Number(
            this.amcItems.get('amcProductWarranty')?.value
          ),
        });
      } else {
        produtcs.push({
          productNo: 0,
          productName: String(this.amcItems.get('amcProductName')?.value),
          productModel: String(this.amcItems.get('amcProductModelNo')?.value),
          productSerialNo: String(
            this.amcItems.get('amcProductSerialNo')?.value
          ),
          productAge: Number(this.amcItems.get('amcProductAge')?.value),
          productValue: Number(this.amcItems.get('amcProductValue')?.value),
          productHsn: String(this.amcItems.get('amcProductHsn')?.value),
          productQty: 1,
          productMrp: 0,
          productSalesPrice: Number(
            this.amcItems.get('amcProductValue')?.value
          ), //without tax
          productPurchasePrice: Number(
            this.amcItems.get('amcProductValue')?.value
          ), //without tax
          productPer: 1,
          productDiscount: 0,
          productCgstPercent: Number(
            this.amcItems.get('amcProductCgstPercent')?.value
          ),
          productSgstPercent: Number(
            this.amcItems.get('amcProductSgstPercent')?.value
          ),
          productIgstPercent: Number(
            this.amcItems.get('amcProductIgstPercent')?.value
          ),
          productFinalGst: 0,
          productTotalAmount: Number(
            this.amcItems.get('amcProductValue')?.value
          ), //without tax
          productNoOfService: Number(
            this.amcItems.get('amcProductNoService')?.value
          ),
          productMonthOfWarranty: Number(
            this.amcItems.get('amcProductWarranty')?.value
          ),
        });
      }

      this.calculateProductsValue_TaxableValue();
      //this code for refresh taxable table data
      this.dataSourceTaxableTable = new MatTableDataSource<TaxableValue>(
        taxableValue
      );
      this.dataSourceTaxableTable._renderChangesSubscription;
      this.clickedRowsSubtotal = new Set<TaxableValue>();

      this.dataSourceListOfProduct = new MatTableDataSource<Products>(produtcs); //adding product data on product table
      this.dataSourceListOfProduct._renderChangesSubscription; //adding product data on product table
    }
  }

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private route: Router,
    private service: Service,
    private validationService: CustomValidationService,
    public fb: FormBuilder
  ) {}

  ngOnDestroy(): void {
    this.totalQty = 0;
    this.totalAmount = 0;
    this.accountList = [];
    this.party = [];
    this.employee = [];
    this.amcVoucherForm.reset();
    this.emiForm.reset();
    this.amcItems.reset();
    taxableValue = [];
    produtcs = [];
    emi = [];
    productServices = [];
  }
  refresh() {
    this.totalQty = 0;
    this.totalAmount = 0;
    this.accountList = [];
    this.party = [];
    this.employee = [];
    this.amcVoucherForm.reset();
    this.emiForm.reset();
    this.amcItems.reset();
    taxableValue = [];
    this.dataSourceTaxableTable = new MatTableDataSource<TaxableValue>(
      taxableValue
    );
    this.dataSourceTaxableTable._renderChangesSubscription;
    produtcs = [];
    this.dataSourceListOfProduct = new MatTableDataSource<Products>(produtcs);
    this.dataSourceListOfProduct._renderChangesSubscription;
    emi = [];
    this.dataSourceEmiTable = new MatTableDataSource<Emi>(emi);
    this.dataSourceEmiTable._renderChangesSubscription;
    productServices = [];
    this.dataSourceServiceTable = new MatTableDataSource<ProductServices>(
      productServices
    );
    this.dataSourceServiceTable._renderChangesSubscription;
    this.amcVoucherForm = this.fb.group({
      transactionalAccount: new FormControl('', [
        Validators.required,
        CustomValidation.customSelect(),
      ]),
      transactionAmount: new FormControl('', [
        Validators.required,
        CustomValidation.customDecimal(),
      ]), //total amount including all tax
      fieldTransactionDate: new FormControl(this.formatDate(new Date()), [
        Validators.required,
        CustomValidation.customDate(),
      ]),
      fieldPartyAccount: new FormControl('', [
        Validators.required,
        CustomValidation.customName(),
      ]), //effected account
      fieldNaration: new FormControl(),
    });
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    this.amcItems = this.fb.group({
      amcProductName: new FormControl('Mouse'),
      amcProductModelNo: new FormControl('Model'),
      amcProductSerialNo: new FormControl('SerialNo'),
      amcProductWarranty: new FormControl(12),
      amcProductNoService: new FormControl(4),
      amcProductAge: new FormControl(4),
      amcProductValue: new FormControl(5000),
      amcProductHsn: new FormControl('xxx'),
      amcProductUnit: new FormControl('Pcs'),
      amcProductCgstPercent: new FormControl(9),
      amcProductSgstPercent: new FormControl(9),
      amcProductIgstPercent: new FormControl(0),
    });

    this.amcVoucherForm = this.fb.group({
      transactionalAccount: new FormControl('', [
        Validators.required,
        CustomValidation.customSelect(),
      ]),
      transactionAmount: new FormControl('', [
        Validators.required,
        CustomValidation.customDecimal(),
      ]), //total amount including all tax
      fieldTransactionDate: new FormControl(this.formatDate(new Date()), [
        Validators.required,
        CustomValidation.customDate(),
      ]),
      fieldPartyAccount: new FormControl('', [
        Validators.required,
        CustomValidation.customName(),
      ]), //effected account
      fieldNaration: new FormControl(),
    });

    this.emiForm = this.fb.group({
      emiProcessingFee: new FormControl(),
      downPaymet: new FormControl(), //total amount including all tax
      installmentRangeNumber: new FormControl(),
      installmentAmount: new FormControl(),
      installmentDate: new FormControl(),
      noOfService: new FormControl(),
    });

    this.getTransactionalAccounts();
    //featch data on party table
    this.getPartyAccounts();
    // get User Data
    this.getUser();
    //identifying the trnsection

    // Emi and Service Implements
  }
  get installmentDate() {
    return this.emiForm.get('installmentDate');
  }
  //End Emi

  // ********************************************-------purchase voucher form-------************************************************
  dataSourcePartyAccounts = new MatTableDataSource<PartyDetailsDTO>(this.party);
  clickedRowsPartyAccounts = new Set<PartyDetailsDTO>();

  getPartyAccounts() {
    this.service.getPartyAccounts().subscribe({
      next: (value) => {
        this.party = value;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataSourcePartyAccounts = new MatTableDataSource<PartyDetailsDTO>(
          this.party
        );
        this.dataSourcePartyAccounts._renderChangesSubscription;
        this.clickedRowsPartyAccounts = new Set<PartyDetailsDTO>();
      },
    });
  }
  getTransactionalAccounts() {
    this.accountList = [];
    this.service.getTransactional_AMC_Accounts().subscribe((response: any) => {
      this.accountList = response;
    });
  }

  matchingPartyAccountSelectEvent($event: any) {
    if (
      this.dataSourcePartyAccounts.filteredData.length !== 0 &&
      this.accountName !== '' &&
      this.accountName !== null
    ) {
      for (let i = 0; i < 1; i++) {
        this.addressBillingFrom =
          this.dataSourcePartyAccounts.filteredData[i].accountName +
          '\n' +
          this.dataSourcePartyAccounts.filteredData[i].partyContactNo1 +
          '\n' +
          this.dataSourcePartyAccounts.filteredData[i].partyEmailId +
          '\n' +
          this.dataSourcePartyAccounts.filteredData[i].partyBillingAddress;
        this.addressShipingFrom =
          this.dataSourcePartyAccounts.filteredData[i].accountName +
          '\n' +
          this.dataSourcePartyAccounts.filteredData[i].partyContactNo1 +
          '\n' +
          this.dataSourcePartyAccounts.filteredData[i].partyEmailId +
          '\n' +
          this.dataSourcePartyAccounts.filteredData[i].partyShipingAddress;
        this.accountName =
          this.dataSourcePartyAccounts.filteredData[i].accountName; //field binding
      }
      this.refreshPage();
      this.partyAddressDisplay = 'display:flex'; //billing From & shiping From def(flex)
    }
  }
  searchingPartyAccountEvent() {
    if (this.accountName !== '' && this.accountName !== null)
      document.onkeydown = function (event) {
        if (event.key === 'Enter') {
          isEnterKeypress = true;
        } else {
          isEnterKeypress = false;
        }
      };
    if (!isEnterKeypress) {
      this.partyDisplay = 'display:block'; //table def(block)
      this.partyAddressDisplay = 'display:none'; //billing From & shiping From def(flex)/
      this.stockDisplay = 'display:none'; //table def(block)
      this.addStockbtn = 'display:none'; //add product button def(block)
      this.produtcsDisplay = 'display:none'; //product table def(block)
      this.subTotal = 'display:none'; //product table def(block)
      this.taxableTableDisplay = 'display:none'; //product table def(flex)
      isEnterKeypress = false;
    } else {
      this.refreshPage();
      this.taxableTableDisplay = 'display:flex'; //product table def(flex)
      isEnterKeypress = false;
    }
  }
  openDialogCreateNewPartyAccount() {
    const dialogRef = this.dialog.open(CreatePartyComponent, {
      width: '100%',
      height: '100%',
      data: [],
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      this.getPartyAccounts();
    });
  }
  openDialogUpdatePartyAccountsAccount(element: any) {
    this.partyEditBtn = true;
    // this.partyDisplay = "display:none";//table
    const dialogRef = this.dialog.open(UpdatePartyComponent, {
      width: '100%',
      height: '100%',
      data: { element },
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getPartyAccounts();
      this.partyEditBtn = false;
    });
  }
  closePartyTableAction() {
    this.refreshPage();
  }
  partyAccountFilterDataEvent($event: any) {
    if (this.accountName !== '' && this.accountName !== null) {
      // ######################### REQUIRE FOR MODIFICATION ##################################
    }
    this.dataSourcePartyAccounts.filter = $event.target.value;
  }
  selectingPartyAccountAction() {
    if (!this.partyEditBtn) {
      for (var item of Array.from(this.clickedRowsPartyAccounts.values())) {
        this.addressBillingFrom =
          item?.accountName +
          '\n' +
          item?.partyContactNo1 +
          '\n' +
          item?.partyEmailId +
          '\n' +
          item?.partyBillingAddress;
        this.addressShipingFrom =
          item?.accountName +
          '\n' +
          item?.partyContactNo1 +
          '\n' +
          item?.partyEmailId +
          '\n' +
          item?.partyShipingAddress;
        this.accountName = item?.accountName; //field binding
        this.accountId = item?.accountId;
      }
      this.refreshPage();
      this.partyAddressDisplay = 'display:flex'; //billing From & shiping From def(flex)
    }
  }
  // ***************************************************-------stock Stock Table-------***************************************************

  getUser() {
    this.service.getEmployee().subscribe((response: any) => {
      this.employee = response;
    });
  }
  // ***************************************************-------end stock Stock Table-------***************************************************
  selectStockStock() {
    if (!this.stockEditBtn) {
      this.refreshPage();
      this.calculateProductsValue_TaxableValue();
    }
  }
  // ********************************************-------product table-------************************************************
  productColumns = [
    'productNo',
    'productName',
    'productHsn',
    'productQty',
    'productSalesPrice',
    'productPer',
    'productDiscount',
    'productFinalGst',
    'productTotalAmount',
    'action',
  ];
  dataSourceListOfProduct = new MatTableDataSource<Products>(produtcs);
  clickedRowsListOfProduct = new Set<Products>();

  changeProductValue() {
    this.calculateProductsValue_TaxableValue();
    this.dataSourceTaxableTable = new MatTableDataSource<TaxableValue>(
      taxableValue
    );
    this.dataSourceTaxableTable._renderChangesSubscription;
    this.clickedRowsSubtotal = new Set<TaxableValue>();
  }

  calculateProductsValue_TaxableValue() {
    taxableValue = [];
    this.totalQty = 0;
    this.totalAmount = 0;

    for (let x: number = 0; x < produtcs.length; x++) {
      //this update apply for amount with discount in ( % ) for each productNames and if quantity and price is change
      produtcs[x].productTotalAmount =
        Number(produtcs[x].productSalesPrice) *
        ((100 - Number(produtcs[x].productDiscount)) / 100) *
        Number(produtcs[x].productQty);
      //update total quantity if qty is change
      this.totalQty += Number(produtcs[x].productQty);
      //update total amount with tax [total amount =qty*price]
      this.totalAmount +=
        (Number(produtcs[x].productTotalAmount) *
          (Number(produtcs[x].productFinalGst) + 100)) /
        100; //include tax
      if (
        produtcs[x].productCgstPercent !== 0 &&
        produtcs[x].productSgstPercent !== 0 &&
        produtcs[x].productIgstPercent === 0
      ) {
        taxableValue.push({
          taxableProductName: produtcs[x].productName,
          cgstTax: Number(produtcs[x].productCgstPercent),
          sgstTax: Number(produtcs[x].productSgstPercent),
          igstTax: Number(0),

          cgstAmount:
            (Number(produtcs[x].productCgstPercent) / 100) *
            Number(produtcs[x].productTotalAmount),
          sgstAmount:
            (Number(produtcs[x].productSgstPercent) / 100) *
            Number(produtcs[x].productTotalAmount),
          igstAmount: 0,
          total:
            (Number(produtcs[x].productCgstPercent) / 100) *
              Number(produtcs[x].productTotalAmount) +
            (Number(produtcs[x].productSgstPercent) / 100) *
              Number(produtcs[x].productTotalAmount),
        });
      } else if (
        produtcs[x].productCgstPercent === 0 &&
        produtcs[x].productSgstPercent === 0 &&
        produtcs[x].productIgstPercent !== 0
      ) {
        taxableValue.push({
          taxableProductName: produtcs[x].productName,
          cgstTax: Number(produtcs[x].productCgstPercent),
          sgstTax: Number(produtcs[x].productSgstPercent),
          igstTax: Number(0),

          cgstAmount: 0,
          sgstAmount: 0,
          igstAmount:
            (Number(produtcs[x].productIgstPercent) / 100) *
            Number(produtcs[x].productTotalAmount),
          total:
            (Number(produtcs[x].productIgstPercent) / 100) *
            Number(produtcs[x].productTotalAmount),
        });
      } else {
        taxableValue.push({
          taxableProductName: produtcs[x].productName,
          cgstTax: Number(produtcs[x].productCgstPercent),
          sgstTax: Number(produtcs[x].productSgstPercent),
          igstTax: Number(0),
          cgstAmount: 0,
          sgstAmount: 0,
          igstAmount: 0,
          total: 0,
        });
      }
    }
    this.payableAmount = this.totalAmount; //should be include extra charges
  }
  navigationUpDown($row_index: any, $col_index: any) {
    // let input3 = document.getElementById(`productName${((ListOfProduct.length)-1)}`) as HTMLElement;
    // input3.focus();

    // let input3 = document.getElementById(`productName${(ListOfProduct.length)}`) as HTMLElement;
    // input3.focus();//native function

    // for (let i: number = 0; i < ListOfProduct.length; i++)
    {
      document.onkeydown = function (event) {
        switch (event.keyCode) {
          case 37:
            // alert('Left key');
            break;
          case 38:
            //focus on last element
            for (let i: number = 0; i < produtcs.length; i++) {
              if (i === $row_index && i === 0 && produtcs.length !== 1) {
                let input3 = document.getElementById(
                  `productName${produtcs.length - 1}`
                ) as HTMLElement;
                input3.focus();
              }

              // //focus on first element
              if (
                i + 1 === produtcs.length &&
                $row_index === produtcs.length - 1 &&
                produtcs.length !== 1
              ) {
                let input3 = document.getElementById(
                  `productName${i - 1}`
                ) as HTMLElement;
                input3.focus(); //native function
              }
              //focus cell up
              if (
                $row_index + 1 !== produtcs.length! &&
                $row_index !== 0 &&
                produtcs.length !== 1
              ) {
                let input3 = document.getElementById(
                  `productName${$row_index - 1}`
                ) as HTMLElement;
                input3.focus(); //native function
              }
              // if (ListOfProduct.length===1 && i=== ListOfProduct.length-1) {
              //   // let input3 = document.getElementById(`productName${(0)}`) as HTMLElement;
              //   // input3.focus();//native function
              // }
            }
            break;
          case 39:
            // alert('Right key');
            break;
          case 40:
            // alert('Down key');
            //focus cell top -> down
            for (let i: number = 0; i < produtcs.length; i++) {
              if (i === $row_index && i === 0 && produtcs.length !== 1) {
                let input3 = document.getElementById(
                  `productName${$row_index + 1}`
                ) as HTMLElement;
                input3.focus();
              }

              //focus cell any position ->down
              if (
                $row_index + 1 !== produtcs.length! &&
                $row_index !== 0 &&
                produtcs.length !== 1
              ) {
                let input3 = document.getElementById(
                  `productName${$row_index + 1}`
                ) as HTMLElement;
                input3.focus(); //native function
              }

              //focus cell bottom-> up
              if (
                i + 1 === produtcs.length &&
                $row_index === produtcs.length - 1 &&
                produtcs.length !== 1
              ) {
                let input3 = document.getElementById(
                  `productName${0}`
                ) as HTMLElement;
                input3.focus(); //native function
              }
              //if table has single row
              // if (ListOfProduct.length===1 && i===ListOfProduct.length-1) {
              //   // let input3 = document.getElementById(`productName${(0)}`) as HTMLElement;
              //   // input3.focus();//native function
              // }
            }
            break;
        }
      };
    }
  }
  openDeleteProductDialog($event: any) {
    produtcs.splice($event, 1); //this code for delete row on product table
    this.calculateProductsValue_TaxableValue();
    this.dataSourceTaxableTable = new MatTableDataSource<TaxableValue>(
      taxableValue
    );
    this.dataSourceTaxableTable._renderChangesSubscription;
    this.clickedRowsSubtotal = new Set<TaxableValue>();
    this.filterProductName = ''; // input field search product name clear
    this.dataSourceListOfProduct = new MatTableDataSource<Products>(produtcs); //adding product data on product table
    this.dataSourceListOfProduct._renderChangesSubscription;
  }

  // *******************************************************************************************************************************
  // ********************************************-------taxable table-------************************************************
  taxableColumns = [
    'taxableProductName',
    'cgstTax',
    'cgstAmount',
    'sgstTax',
    'sgstAmount',
    'igstTax',
    'igstAmount',
    'total',
  ];

  dataSourceTaxableTable = new MatTableDataSource<TaxableValue>(taxableValue);
  clickedRowsSubtotal = new Set<TaxableValue>();
  calculatePercent(price: number, percentage: number): number {
    return (price * percentage) / 100;
  }

  ngDoCheck(): void {}
  refreshPage() {
    this.partyDisplay = 'display:none'; //table def(block)
    this.stockDisplay = 'display:none'; //table def(block)
    this.addStockbtn = 'display:block'; //add product button def(block)
    this.produtcsDisplay = 'display:block'; //product table def(block)
    this.formField = 'display:block'; //product table def(block)
    this.subTotal = 'display:block'; //product table def(block)
    this.taxableTableDisplay = 'display:flex'; //product table def(flex)
    this.submitBtnDisplay = 'display:block';
    this.serviceTableDisplay = 'display:block';
    this.emiTableDisplay = 'display:block';
  }
  addStock() {
    this.partyAddressDisplay = 'display:none'; //billing From & shiping From def(flex)
    this.partyDisplay = 'display:none'; //table def(block)
    this.stockDisplay = 'display:block'; //table def(block)
    this.addStockbtn = 'display:none'; //add product button def(block)
    this.produtcsDisplay = 'display:none'; //product table def(block)
    this.formField = 'display:none'; //product table def(block)
    this.subTotal = 'display:none'; //product table def(block)
    this.taxableTableDisplay = 'display:none'; //product table def(flex)
    this.emiTableDisplay = 'display:none';
    this.serviceTableDisplay = 'display:none';
    this.submitBtnDisplay = 'display:none';
  }

  // ``````````````````````````````````````````````````````````EMI`````````````````````````````````````````
  // Emi and Service Implements
  emiFormDisplay = 'display:flex';
  emiTableDisplay = 'display:flex';
  serviceTableDisplay = 'display:flex';

  emiColumns = ['emiNo', 'emiDate', 'emiAmount', 'emiMessage'];
  dataSourceEmiTable = new MatTableDataSource<Emi>(emi);
  clickedRowsEmi = new Set<Emi>();

  serviceColumns = ['psNo', 'psDate', 'psEngineerName', 'psMessage'];
  dataSourceServiceTable = new MatTableDataSource<ProductServices>(
    productServices
  );
  clickedRowsService = new Set<ProductServices>();

  isEmi() {
    if (this.amcVoucherForm.get('transactionalAccount')?.value === 'default') {
      this.emiFormDisplay = 'display:none';
      this.emiTableDisplay = 'display:none';
      this.submitBtnDisplay = 'display:none';
      this.calculateEmi();
    } else if (      this.amcVoucherForm.get('transactionalAccount')?.value ===      'Sundry Debtors'    ) {
      this.emiFormDisplay = 'display:block';
      this.emiTableDisplay = 'display:block';
      this.submitBtnDisplay = 'display:block';
      this.calculateEmi();
    } else {
      if (Number(this.amcVoucherForm.get('transactionAmount')?.value) != 0) {
        this.calculateService();
      }
      this.serviceTableDisplay = 'display:block';
      this.emiFormDisplay = 'display:none';
      this.emiTableDisplay = 'display:none';
      this.submitBtnDisplay = 'display:block';
    }

    if (Number(this.amcVoucherForm.get('transactionAmount')?.value) !== 0) {
    }
  }
  // re-initialized service,emi
  calculateEmi() {
    if (
      Number(this.amcVoucherForm.get('transactionAmount')?.value) != 0 &&
      String(this.installmentRangeNumber) != '' &&
      Number(this.installmentRangeNumber) != null
    ) {
      productServices = [];
      emi = [];

      this.installmentAmount = 0;

      if (
        Number(this.emiProcessingFee) !== 0 &&
        Number(this.downPaymet) !== 0
      ) {
        if (Number(this.installmentRangeNumber) !== 0) {
          this.installmentAmount +=
            (Number(this.amcVoucherForm.get('transactionAmount')?.value) +
              Number(this.emiProcessingFee) -
              Number(this.downPaymet)) /
            Number(this.installmentRangeNumber);
        } else {
          this.installmentAmount +=
            Number(this.amcVoucherForm.get('transactionAmount')?.value) +
            Number(this.emiProcessingFee) -
            Number(this.downPaymet);
        }
      } else if (
        Number(this.emiProcessingFee) === 0 &&
        Number(this.downPaymet) === 0
      ) {
        if (Number(this.installmentRangeNumber) !== 0) {
          this.installmentAmount +=
            Number(this.amcVoucherForm.get('transactionAmount')?.value) /
            Number(this.installmentRangeNumber);
        } else {
          this.installmentAmount += Number(
            this.amcVoucherForm.get('transactionAmount')?.value
          );
        }
      } else if (
        Number(this.emiProcessingFee) !== 0 &&
        Number(this.downPaymet) === 0
      ) {
        if (Number(this.installmentRangeNumber) !== 0) {
          this.installmentAmount +=
            (Number(this.amcVoucherForm.get('transactionAmount')?.value) +
              Number(this.emiProcessingFee)) /
            Number(this.installmentRangeNumber);
        } else {
          this.installmentAmount +=
            Number(this.amcVoucherForm.get('transactionAmount')?.value) +
            Number(this.emiProcessingFee);
        }
      } else if (
        Number(this.emiProcessingFee) === 0 &&
        Number(this.downPaymet) !== 0
      ) {
        if (Number(this.installmentRangeNumber) !== 0) {
          this.installmentAmount +=
            (Number(this.amcVoucherForm.get('transactionAmount')?.value) -
              Number(this.downPaymet)) /
            Number(this.installmentRangeNumber);
        } else {
          this.installmentAmount +=
            Number(this.amcVoucherForm.get('transactionAmount')?.value) -
            Number(this.downPaymet);
        }
      }
      let emi_Date = new Date(this.installmentDate?.value);
      for (
        let range: number = 0;
        range < Number(this.installmentRangeNumber);
        range++
      ) {
        emi_Date.setMonth(emi_Date.getMonth() + 1);
        emi.push({
          emiNo: range + 1,
          emiDate: String(this.datePipe.transform(emi_Date, 'yyyy-MM-dd')),
          emiAmount: Number(this.installmentAmount),
          emiMessage:
            'Dear Customer: Your Next Emi Date On ' +
            String(this.datePipe.transform(emi_Date, 'yyyy-MM-dd')) +
            ' Rs.' +
            Number(this.installmentAmount),
          emiStatus: 'Pending',
          emiSmsStatus: true,
        });
      }

      for (let items: number = 0; items < produtcs.length; items++) {
        let serviceDate = new Date(
          this.amcVoucherForm.get('fieldTransactionDate')?.value
        );

        let serviceRange = ~~(
          Number(produtcs[items].productMonthOfWarranty) /
          Number(produtcs[items].productNoOfService)
        );
        for (
          let range: number = 0;
          range < Number(produtcs[items].productNoOfService);
          range++
        ) {
          if (serviceDate.getMonth() === 0) {
            serviceDate.setMonth(
              serviceDate.getMonth() + (Number(serviceRange) - 1)
            );
          } else {
            serviceDate.setMonth(serviceDate.getMonth() + Number(serviceRange));
          }
          productServices.push({
            psNo: range + 1,
            psDate: String(this.datePipe.transform(serviceDate, 'yyyy-MM-dd')),
            psEngineerName: '',
            psStatus: 'Pending',
            psMessage:
              'Dear Customer: Your Next Service Date On ' +
              String(this.datePipe.transform(serviceDate, 'yyyy-MM-dd')),
            serviceProductSerialNo: [{ serialNo: 'xxxxxxxxx' }],
          });
        }
      }
    }
    this.dataSourceEmiTable = new MatTableDataSource<Emi>(emi);
    this.dataSourceEmiTable._renderChangesSubscription;
    this.clickedRowsEmi = new Set<Emi>();
    this.dataSourceServiceTable = new MatTableDataSource<ProductServices>(
      productServices
    );
    this.dataSourceServiceTable._renderChangesSubscription;
    this.clickedRowsService = new Set<ProductServices>();
  }
  // re-initialized service
  calculateService() {
    productServices = [];

    for (let items: number = 0; items < produtcs.length; items++) {
      let serviceDate = new Date(
        this.amcVoucherForm.get('fieldTransactionDate')?.value
      );

      let serviceRange = ~~(
        Number(produtcs[items].productMonthOfWarranty) /
        Number(produtcs[items].productNoOfService)
      );
      for (
        let range: number = 0;
        range < Number(produtcs[items].productNoOfService);
        range++
      ) {
        if (serviceDate.getMonth() === 0) {
          serviceDate.setMonth(
            serviceDate.getMonth() + (Number(serviceRange) - 1)
          );
        } else {
          serviceDate.setMonth(serviceDate.getMonth() + Number(serviceRange));
        }

        productServices.push({
          psNo: range + 1,
          psDate: String(this.datePipe.transform(serviceDate, 'yyyy-MM-dd')),
          psEngineerName: '',
          psStatus: 'Pending',
          psMessage:
            'Dear Customer: Your Next Service Date On ' +
            String(this.datePipe.transform(serviceDate, 'yyyy-MM-dd')),
          serviceProductSerialNo: [{ serialNo: 'xxxxxxxxx' }],
        });
      }
    }
    this.dataSourceServiceTable = new MatTableDataSource<ProductServices>(
      productServices
    );
    this.dataSourceServiceTable._renderChangesSubscription;
    this.clickedRowsService = new Set<ProductServices>();
  }

  emiPurchase() {
    let transectionalAccounts: TransectionalAccounts = {
      transactionAccountName: this.amcVoucherForm.get('transactionalAccount')
        ?.value,
      transactionAmount: Number(
        this.amcVoucherForm.get('transactionAmount')?.value
      ),
    };
    // let bookDetails: BookDetails[] = [];
    let bookDetails: any[] = [];
    let amcServiceEmi: AmcServiceEmi;
    for (let i = 0; i < produtcs.length; i++) {
      bookDetails.push({
        // bookDetailsId:0,//primary Key Of BookDetails Which is manage by backend api
        // bookDetailsBookInfo_Ref:0,//foreign Key Of (BookInfo Id) Which is manage by backend api
        bookDetailsInventoryItems_Ref: produtcs[i].productNo, //foreign Key Of (InventoryItems Id) Which is manage by backend api
        bookDetailsMolelNo: produtcs[i].productModel,
        iiMonthOfWarranty: produtcs[i].productMonthOfWarranty,
        iiNoOfService: produtcs[i].productNoOfService,
        iiHsn: produtcs[i].productHsn,
        iiParticular: produtcs[i].productName,
        bookDetailsUnit: 'Pcs',
        bookDetailsUnitValue: produtcs[i].productQty,
        bookDetailsTradDiscount: produtcs[i].productDiscount,
        bookDetailsTradDiscountAmount: produtcs[i].productDiscount,
        bookDetailsParticularAmount: produtcs[i].productTotalAmount,
        bookDetailsCgst: Number(produtcs[i].productCgstPercent),
        bookDetailsSgst: Number(produtcs[i].productSgstPercent),
        bookDetailsIgst: Number(produtcs[i].productIgstPercent),
        bookItemsSerialNo: [{ serialNo: 'xxxxxx' }],
        bookDetailsCgstAmount:
          this.calculatePercent(
            this.calculatePercent(
              Number(produtcs[i].productSalesPrice),
              100 - Number(produtcs[i].productDiscount)
            ),
            Number(produtcs[i].productCgstPercent)
          ) * Number(produtcs[i].productQty),
        bookDetailsSgstAmount:
          this.calculatePercent(
            this.calculatePercent(
              Number(produtcs[i].productSalesPrice),
              100 - Number(produtcs[i].productDiscount)
            ),
            Number(produtcs[i].productSgstPercent)
          ) * Number(produtcs[i].productQty),
        bookDetailsIgstAmount:
          this.calculatePercent(
            this.calculatePercent(
              Number(produtcs[i].productSalesPrice),
              100 - Number(produtcs[i].productDiscount)
            ),
            Number(produtcs[i].productIgstPercent)
          ) * Number(produtcs[i].productQty),
      });
    }
    let product: Product[] = [];
    let newProductservices: ProductServices[] = [];
    let j = 0,
      k = 0;
    for (let items: number = 0; items < produtcs.length; items++) {
      k += produtcs[items].productNoOfService;
      for (; j < k; j++) {
        newProductservices.push({
          psEngineerName: productServices[j].psEngineerName,
          psNo: productServices[j].psNo,
          psDate: productServices[j].psDate,
          psStatus: 'Pending',
          psMessage: productServices[j].psMessage,
          serviceProductSerialNo: [{ serialNo: 'xxxxxxxxx' }],
        });
      }
      product.push({
        ps_AccountId: this.accountId,
        ps_AuthorId: 1,
        psProductName: produtcs[items].productName,
        psProductModel: 'xx034',
        psProductSerialNo: 'xxxxx',
        psProductAge: 0,
        psProductValue: produtcs[items].productTotalAmount,
        psType: 'AMC Service',
        psMonthOfWarranty: produtcs[items].productMonthOfWarranty,
        psTotalService: produtcs[items].productNoOfService,
        productServices: newProductservices,
      });
    }

    amcServiceEmi = {
      userId: 1,
      accountId: this.accountId,
      partyAcName: this.amcVoucherForm.get('fieldPartyAccount')?.value,
      transectionDate: this.amcVoucherForm.get('fieldTransactionDate')?.value,
      naration: this.amcVoucherForm.get('fieldNaration')?.value,
      product: product,
      transectionalAccounts,
      bookDetails,
      emi: emi,
    };
    if (this.amcVoucherForm.valid) {
      this.service.addAmcServiceEmi(amcServiceEmi).subscribe({
        next: (value) => {},
        error: (err) => {
          if (err.status === 400) {
            alert('Transaction Failed! Please check your input data.');
          } else if (err.status === 401) {
            alert('Authentication failed. Please log in.');
          } else {
            alert(
              'Transaction Failed! Something went wrong. Please try again later.'
            );
          }
        },
        complete: () => {
          alert('Transaction Successful!');
          this.refresh();
        },
      });
    } else {
      alert('Transaction Failed! Please fill in all required fields.');
    }
  }

  // validation
  getErrorMessagePartyName(controlName: string): string | null {
    const control = this.amcVoucherForm.get(controlName);
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
  getErrorMessageTransectionDate(controlName: string): string | null {
    const control = this.amcVoucherForm.get(controlName);
    return control
      ? this.validationService.getErrorMessageDate(control, '*', '*')
      : null;
  }
  getErrorMessageSelectTransectionAcc(controlName: string): string | null {
    const control = this.amcVoucherForm.get(controlName);
    return control
      ? this.validationService.getErrorMessageSelect(control, '*')
      : null;
  }
  getErrorMessageTransectionAmount(controlName: string): string | null {
    const control = this.amcVoucherForm.get(controlName);
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
}
