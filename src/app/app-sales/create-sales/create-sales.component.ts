import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CreatePartyComponent } from 'src/app/app-party/create-party/create-party.component';
import { UpdatePartyComponent } from 'src/app/app-party/update-party/update-party.component';
import { CreateStockComponent } from 'src/app/app-stock/create-stock/create-stock.component';
import { UpdateStockComponent } from 'src/app/app-stock/update-stock/update-stock.component';
import { AddInventoryItemsDTO, AddInventoryJournalDTO } from 'src/app/model/add-inventory';
import { AccountList } from 'src/app/model/account-list';
import { Emi } from 'src/app/model/emi';
import { EmployeeDetailsDTO } from 'src/app/model/employee';
import { PartyDetailsDTO } from 'src/app/model/party';
import { Product } from 'src/app/model/product';
import { ProductServices } from 'src/app/model/product-service';
import { Products } from 'src/app/model/products';
import { Sales } from 'src/app/model/sales';
import { TaxableValue } from 'src/app/model/tax';
import { TransectionalAccounts } from 'src/app/model/transactional-account';
import { Service } from 'src/app/services/service.service';
import { UpdateInventoryItemsDTO } from 'src/app/model/update-inventory';
import { CustomValidationService } from 'src/app/app-validator/custom-validation-service';
import { CustomValidation } from 'src/app/app-validator/custom-validation';

let taxableValue: TaxableValue[] = [];
let produtcs: Products[] = [];
// Emi and Product Service Code
let emi: Emi[] = [];
// let productServices: ProductServices[] = [];
let productServices: any[] = [];
// End emi
let isEnterKeypress: boolean = false;
@Component({
  selector: 'app-create-sales',
  templateUrl: './create-sales.component.html',
  styleUrls: ['./create-sales.component.css'],
  providers: [DatePipe]
})
export class CreateSalesComponent implements OnInit {
  salesVoucherForm!: FormGroup;
  emiForm!: FormGroup;
  accountList: any[] = [];
  employee: EmployeeDetailsDTO[] = [];
  party: PartyDetailsDTO[] = [];
  stock: AddInventoryItemsDTO[] = []
  currentDate = new Date();
  datex = new Date(this.currentDate);
  invoiceNo = 101;
  partyIndex = -1;

  accountId!: number;
  accountName: any = "";//field binding
  listAccount: any = "";
  addressBillingFrom: any = "";//field binding
  addressShipingFrom: any = "";//field binding
  totalQty: number = 0;
  totalAmount: number = 0;
  payableAmount: number = 0;


  partyAddressDisplay = "display:none";//billing From & shiping From def(flex)
  partyDisplay = "display:none";//table def(block)
  stockDisplay = "display:none";//table def(block)
  addStockbtn = "display:block";//add product button def(block)
  produtcsDisplay = "display:block";//product table def(block)
  formField = "display:block";//product table def(block)
  subTotal = "display:block";//product table def(block)
  taxableTableDisplay ="display:block";//product table def(flex)

  filterProductName = '';
  // partySelected: boolean = false;
  stockEditBtn: boolean = false;
  partyEditBtn: boolean = false;

  emiProcessingFee: number = 0;
  downPaymet: number = 0;
  installmentRangeNumber: number = 1;
  installmentAmount: number = 0;

  dilogData: any
  partyColumns = ['accountName', 'accountId', 'partyContactNo1', 'partyEmailId', 'partyBillingAddress', 'partyShipingAddress', 'action'];
  getData: any;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private route: Router,
    private service: Service,
    private validationService: CustomValidationService,
    public fb: FormBuilder) { }

    ngOnDestroy(): void {
      this.totalQty = 0;
      this.totalAmount = 0;
      this.accountList = [];
      this.party = [];
      this.stock = [];
      this.employee = [];
      this.salesVoucherForm.reset();
      this.emiForm.reset();
      taxableValue = [];
      produtcs = [];
      emi = [];
      productServices= [];
      this.getTransactionalAccounts();

    }
  refresh(){
    this.totalQty = 0;
    this.totalAmount = 0;
    this.accountList = [];
    this.party = [];
    this.stock = [];
    this.employee = [];
    this.salesVoucherForm.reset();
    this.emiForm.reset();
    taxableValue = [];
    this.dataSourceTaxableTable = new MatTableDataSource<TaxableValue>(taxableValue);
    this.dataSourceTaxableTable._renderChangesSubscription;
    produtcs = [];
    this.dataSourceListOfProduct = new MatTableDataSource<Products>(produtcs);
    this.dataSourceListOfProduct._renderChangesSubscription;
    emi = [];
    this.dataSourceEmiTable= new MatTableDataSource<Emi>(emi);
    this.dataSourceEmiTable._renderChangesSubscription;
    productServices= [];
    this.dataSourceServiceTable = new MatTableDataSource<ProductServices>(productServices);
      this.dataSourceServiceTable._renderChangesSubscription;
      this.getTransactionalAccounts();
      this.emiForm = this.fb.group({
        emiProcessingFee: new FormControl('', [Validators.required,CustomValidation.customNumber()]),
        downPaymet: new FormControl('', [Validators.required,CustomValidation.customNumber()]),//total amount including all tax
        installmentRangeNumber: new FormControl(this.installmentRangeNumber, [Validators.required,CustomValidation.customNumberMin1()]),
        installmentAmount: new FormControl(this.installmentAmount, [Validators.required,CustomValidation.customDecimal()]),
        installmentDate: new FormControl(this.formatDate(new Date()),[Validators.required,CustomValidation.customDate()]),
        noOfService: new FormControl(),
      })
      this.salesVoucherForm = this.fb.group({
        transactionalAccount: new FormControl('', [Validators.required,CustomValidation.customSelect()]),
        transactionAmount: new FormControl('', [Validators.required,CustomValidation.customDecimal()]),//total amount including all tax
        fieldTransactionDate: new FormControl(this.formatDate(new Date()),[Validators.required,CustomValidation.customDate()]),
        fieldPartyAccount: new FormControl('',[Validators.required,CustomValidation.customName()]),//effected account
        fieldNaration: new FormControl()
      })
  }  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    this.getTransactionalAccounts();
    //featch data on party table
    this.getPartyAccounts();
    //featch data on stock table
    this.getStocks();
    // get User Data
    this.getEmployee();
    //identifying the trnsection
    this.salesVoucherForm = this.fb.group({
      transactionalAccount: new FormControl('', [Validators.required,CustomValidation.customSelect()]),
      transactionAmount: new FormControl('', [Validators.required,CustomValidation.customDecimal()]),//total amount including all tax
      fieldTransactionDate: new FormControl(this.formatDate(new Date()),[Validators.required,CustomValidation.customDate()]),
      fieldPartyAccount: new FormControl('',[Validators.required,CustomValidation.customName()]),//effected account
      fieldNaration: new FormControl()
    })

    // Emi and Service Implements
    this.emiForm = this.fb.group({
      emiProcessingFee: new FormControl('', [Validators.required,CustomValidation.customNumber()]),
      downPaymet: new FormControl('', [Validators.required,CustomValidation.customNumber()]),//total amount including all tax
      installmentRangeNumber: new FormControl(this.installmentRangeNumber, [Validators.required,CustomValidation.customNumberMin1()]),
      installmentAmount: new FormControl(this.installmentAmount, [Validators.required,CustomValidation.customDecimal()]),
      installmentDate: new FormControl(this.formatDate(new Date()),[Validators.required,CustomValidation.customDate()]),
      noOfService: new FormControl(),
    })

  }
  // get installmentDate() {
  //   return this.emiForm.get('installmentDate');
  // }
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
        this.dataSourcePartyAccounts = new MatTableDataSource<PartyDetailsDTO>(this.party);
        this.dataSourcePartyAccounts._renderChangesSubscription;
        this.clickedRowsPartyAccounts = new Set<PartyDetailsDTO>();
      }
    })
  }
  getTransactionalAccounts() {
    this.accountList = [];
    this.service.getTransactional_sales_Accounts().subscribe((response: any) => {
      this.accountList = response;

    })

  }

  matchingPartyAccountSelectEvent($event: any) {

    if (this.dataSourcePartyAccounts.filteredData.length !== 0 && this.accountName !== "" && this.accountName !== null) {
      for (let i = 0; i < 1; i++) {
        this.addressBillingFrom =
          this.dataSourcePartyAccounts.filteredData[i].accountName + "\n" +
          this.dataSourcePartyAccounts.filteredData[i].partyContactNo1 + "\n" +
          this.dataSourcePartyAccounts.filteredData[i].partyEmailId + "\n" +
          this.dataSourcePartyAccounts.filteredData[i].partyBillingAddress;
        this.addressShipingFrom =
          this.dataSourcePartyAccounts.filteredData[i].accountName + "\n" +
          this.dataSourcePartyAccounts.filteredData[i].partyContactNo1 + "\n" +
          this.dataSourcePartyAccounts.filteredData[i].partyEmailId + "\n" +
          this.dataSourcePartyAccounts.filteredData[i].partyShipingAddress;
        this.accountName =
          this.dataSourcePartyAccounts.filteredData[i].accountName//field binding
      }
      this.refreshPage();
      this.partyAddressDisplay ="display:block";//billing From & shiping From def(flex)
    }
  }
  searchingPartyAccountEvent() {
    if (this.accountName !== "" && this.accountName !== null)
      document.onkeydown = function (event) {
        if (event.key === "Enter") {
          isEnterKeypress = true;
        } else {
          isEnterKeypress = false;
        }
      }
    if (!isEnterKeypress) {
      this.partyDisplay = "display:block";//table def(block)
      this.partyAddressDisplay = "display:none";//billing From & shiping From def(flex)/
      this.stockDisplay = "display:none";//table def(block)
      this.addStockbtn = "display:none";//add product button def(block)
      this.produtcsDisplay = "display:none";//product table def(block)
      this.subTotal = "display:none";//product table def(block)
      this.taxableTableDisplay = "display:none";//product table def(flex)
      isEnterKeypress = false;
    }
    else {
      this.refreshPage();
      this.taxableTableDisplay ="display:block";//product table def(flex)
      isEnterKeypress = false;
    }
  }
  openDialogCreateNewPartyAccount() {
    const dialogRef = this.dialog.open(CreatePartyComponent, {
      width: '100%',
      height: '100%',
      data: []
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      this.getPartyAccounts();
    })
  }
  openDialogUpdatePartyAccountsAccount(element: any) {
    this.partyEditBtn = true;
    // this.partyDisplay = "display:none";//table
    const dialogRef = this.dialog.open(UpdatePartyComponent, {
      width: '100%',
      height: '100%',
      data: { element }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getPartyAccounts();
      this.partyEditBtn = false;
    })
  }
  closePartyTableAction() {
    this.refreshPage();
  }
  partyAccountFilterDataEvent($event: any) {

    if (this.accountName !== "" && this.accountName !== null) {
      // ######################### REQUIRE FOR MODIFICATION ##################################
    }
    this.dataSourcePartyAccounts.filter = $event.target.value;
  }
  selectingPartyAccountAction() {

    if (!this.partyEditBtn) {
      for (var item of Array.from(this.clickedRowsPartyAccounts.values())) {
        this.addressBillingFrom =
          item?.accountName + "\n" +
          item?.partyContactNo1 + "\n" +
          item?.partyEmailId + "\n" +
          item?.partyBillingAddress;
        this.addressShipingFrom =
          item?.accountName + "\n" +
          item?.partyContactNo1 + "\n" +
          item?.partyEmailId + "\n" +
          item?.partyShipingAddress;
        this.accountName = item?.accountName//field binding
        this.accountId = item.accountId;
      }

      this.refreshPage();
      this.partyAddressDisplay ="display:block";//billing From & shiping From def(flex)
    }
  }
  // ***************************************************-------stock Stock Table-------*************************************************** 
  stockColumns = ['IiId', 'iiParticular', 'iiHsn', 'iiQty', 'iiPurchaseAmount', 'iiSalesAmount', 'action'];
  dataSourceStock = new MatTableDataSource<AddInventoryItemsDTO>(this.stock);
  clickedRowsStock = new Set<UpdateInventoryItemsDTO>();
  getStocks() {
    this.service.getStocks().subscribe({
      next: (value) => {
        this.stock = value;
      },
      error: (e) => { },
      complete: () => {
        this.dataSourceStock = new MatTableDataSource<AddInventoryItemsDTO>(this.stock);
        this.dataSourceStock._renderChangesSubscription;
        this.clickedRowsStock = new Set<UpdateInventoryItemsDTO>();
      }
    })
  }
  getEmployee() {

    this.service.getEmployee().subscribe({
      next: (value) => { this.employee = value },
      error: (err) => { },
      complete: () => {
      }
    }
    )
  }
  filterProductData($event: any) {
    this.dataSourceStock.filter = $event.target.value;
  }
  openDialogCreateNewStock() {

    {
      this.stockEditBtn = true;
      // this.partyDisplay = "display:none";//table
      const dialogRef = this.dialog.open(CreateStockComponent, {
        width: '100%',
        height: '100%',
        data: []
      });
      dialogRef.afterClosed().subscribe((response: any) => {
        this.getStocks();
        this.stockEditBtn = false;
      })
    }
  }
  closeStockStock() {
    this.refreshPage();

  }
  openDialogUpdateStock(element: any) {
    this.stockEditBtn = true;
    // this.partyDisplay = "display:none";//table
    const dialogRef = this.dialog.open(UpdateStockComponent, {
      width: '100%',
      height: '100%',
      data: { element }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getStocks();
      this.stockEditBtn = false;
    })
  }


  selectStockStock() {
    if (!this.stockEditBtn) {
      this.refreshPage();

      for (var list of Array.from(this.clickedRowsStock.values())) {

        if (list.iiCgstPercent !== 0 && list.iiSgstPercent !== 0 && list.iiIgstPercent === 0) {
          produtcs.push({
            productNo: list.iiId,
            productName: list.iiParticular,
            productHsn: list.iiHsn,

            productModel: list.iiModelNo,
            productSerialNo: "",
            productAge: 0,
            productValue: list.iiSalesAmount,

            productQty: 1,
            productMrp: list.iiMrp,
            productSalesPrice: list.iiSalesAmount,//without tax
            productPurchasePrice: list.iiPurchaseAmount,//without tax
            productPer: 1,
            productDiscount: 0,
            productCgstPercent: list.iiCgstPercent,
            productSgstPercent: list.iiSgstPercent,
            productIgstPercent: 0,
            productFinalGst: Number(list.iiCgstPercent) + Number(list.iiSgstPercent),
            productTotalAmount: list.iiSalesAmount,//without tax
            productNoOfService: list.iiNoOfService,
            productMonthOfWarranty: list.iiMonthOfWarranty
          })
        } else if (list.iiCgstPercent === 0 && list.iiSgstPercent === 0 && list.iiIgstPercent !== 0) {
          produtcs.push({
            productNo: list.iiId,
            productName: list.iiParticular,
            productModel: "",
            productSerialNo: "",
            productAge: 0,
            productValue: list.iiSalesAmount,
            productHsn: list.iiHsn,
            productQty: 1,
            productMrp: list.iiMrp,
            productSalesPrice: list.iiSalesAmount,//without tax
            productPurchasePrice: list.iiPurchaseAmount,//without tax
            productPer: 1,
            productDiscount: 0,
            productCgstPercent: 0,
            productSgstPercent: 0,
            productIgstPercent: list.iiIgstPercent,
            productFinalGst: Number(list.iiIgstPercent),
            productTotalAmount: list.iiSalesAmount,//without tax
            productNoOfService: list.iiNoOfService,
            productMonthOfWarranty: list.iiMonthOfWarranty
          })
        } else {
          produtcs.push({
            productNo: list.iiId,
            productName: list.iiParticular,
            productModel: "",
            productSerialNo: "",
            productAge: 0,
            productValue: list.iiSalesAmount,
            productHsn: list.iiHsn,
            productQty: 1,
            productMrp: list.iiMrp,
            productSalesPrice: list.iiSalesAmount,//without tax
            productPurchasePrice: list.iiPurchaseAmount,//without tax
            productPer: 1,
            productDiscount: 0,
            productCgstPercent: 0,
            productSgstPercent: 0,
            productIgstPercent: 0,
            productFinalGst: 0,
            productTotalAmount: list.iiSalesAmount,//without tax
            productNoOfService: list.iiNoOfService,
            productMonthOfWarranty: list.iiMonthOfWarranty
          })
        }
      }
      this.calculateProductsValue_TaxableValue();
      //this code for refresh taxable table data
      this.dataSourceTaxableTable = new MatTableDataSource<TaxableValue>(taxableValue);
      this.dataSourceTaxableTable._renderChangesSubscription;
      this.clickedRowsSubtotal = new Set<TaxableValue>();

      this.clickedRowsStock.clear();//privious rows clear
      this.filterProductName = '';// input field search product name clear
      this.dataSourceListOfProduct = new MatTableDataSource<Products>(produtcs);//adding product data on product table
      this.dataSourceListOfProduct._renderChangesSubscription;
      this.dataSourceStock.filter = "";//filter clear

    }
  }
  // ***************************************************-------end stock Stock Table-------*************************************************** 

  // ********************************************-------product table-------************************************************ 
  productColumns = ['productNo', 'productName', 'productHsn', 'productQty', 'productSalesPrice', 'productPer', 'productDiscount', 'productFinalGst', 'productTotalAmount', 'action'];
  dataSourceListOfProduct = new MatTableDataSource<Products>(produtcs);
  clickedRowsListOfProduct = new Set<Products>();

  changeProductValue() {
    this.calculateProductsValue_TaxableValue();
    this.dataSourceTaxableTable = new MatTableDataSource<TaxableValue>(taxableValue);
    this.dataSourceTaxableTable._renderChangesSubscription;
    this.clickedRowsSubtotal = new Set<TaxableValue>();

  }

  calculateProductsValue_TaxableValue() {
    taxableValue = []
    this.totalQty = 0;
    this.totalAmount = 0;

    for (let x: number = 0; x < produtcs.length; x++) {
      //this update apply for amount with discount in ( % ) for each productNames and if quantity and price is change
      produtcs[x].productTotalAmount = ((Number(produtcs[x].productSalesPrice) * ((100 - Number(produtcs[x].productDiscount)) / 100)) * Number(produtcs[x].productQty));
      //update total quantity if qty is change
      this.totalQty += Number(produtcs[x].productQty);
      //update total amount with tax [total amount =qty*price]
      this.totalAmount += ((Number(produtcs[x].productTotalAmount) * (Number(produtcs[x].productFinalGst) + 100)) / 100); //include tax
      if (produtcs[x].productCgstPercent !== 0 && produtcs[x].productSgstPercent !== 0 && produtcs[x].productIgstPercent === 0) {

        taxableValue.push({
          taxableProductName: produtcs[x].productName,
          cgstTax: Number(produtcs[x].productCgstPercent),
          sgstTax: Number(produtcs[x].productSgstPercent),
          igstTax: Number(0),

          cgstAmount: ((Number(produtcs[x].productCgstPercent) / 100) * Number(produtcs[x].productTotalAmount)),
          sgstAmount: ((Number(produtcs[x].productSgstPercent) / 100) * Number(produtcs[x].productTotalAmount)),
          igstAmount: 0,
          total: (
            ((Number(produtcs[x].productCgstPercent) / 100) * Number(produtcs[x].productTotalAmount)) +
            ((Number(produtcs[x].productSgstPercent) / 100) * Number(produtcs[x].productTotalAmount))
          )
        })

      } else if (produtcs[x].productCgstPercent === 0 && produtcs[x].productSgstPercent === 0 && produtcs[x].productIgstPercent !== 0) {

        taxableValue.push({
          taxableProductName: produtcs[x].productName,
          cgstTax: Number(produtcs[x].productCgstPercent),
          sgstTax: Number(produtcs[x].productSgstPercent),
          igstTax: Number(0),

          cgstAmount: 0,
          sgstAmount: 0,
          igstAmount: (((Number(produtcs[x].productIgstPercent) / 100) * Number(produtcs[x].productTotalAmount))),
          total: (((Number(produtcs[x].productIgstPercent) / 100) * Number(produtcs[x].productTotalAmount)))
        })

      } else {
        taxableValue.push({
          taxableProductName: produtcs[x].productName,
          cgstTax: Number(produtcs[x].productCgstPercent),
          sgstTax: Number(produtcs[x].productSgstPercent),
          igstTax: Number(0),
          cgstAmount: 0,
          sgstAmount: 0,
          igstAmount: 0,
          total: 0
        })

      }


    }
    this.payableAmount = this.totalAmount;//should be include extra charges

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
                let input3 = document.getElementById(`productName${((produtcs.length) - 1)}`) as HTMLElement;
                input3.focus();
              }


              // //focus on first element
              if (i + 1 === produtcs.length && $row_index === produtcs.length - 1 && produtcs.length !== 1) {
                let input3 = document.getElementById(`productName${((i) - 1)}`) as HTMLElement;
                input3.focus();//native function


              }
              //focus cell up
              if ($row_index + 1 !== produtcs.length! && $row_index !== 0 && produtcs.length !== 1) {
                let input3 = document.getElementById(`productName${(($row_index) - 1)}`) as HTMLElement;
                input3.focus();//native function


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
                let input3 = document.getElementById(`productName${(($row_index) + 1)}`) as HTMLElement;
                input3.focus();
              }

              //focus cell any position ->down
              if ($row_index + 1 !== produtcs.length! && $row_index !== 0 && produtcs.length !== 1) {
                let input3 = document.getElementById(`productName${(($row_index) + 1)}`) as HTMLElement;
                input3.focus();//native function
              }

              //focus cell bottom-> up
              if (i + 1 === produtcs.length && $row_index === produtcs.length - 1 && produtcs.length !== 1) {
                let input3 = document.getElementById(`productName${(0)}`) as HTMLElement;
                input3.focus();//native function
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
    produtcs.splice($event, 1);//this code for delete row on product table
    this.calculateProductsValue_TaxableValue();
    this.dataSourceTaxableTable = new MatTableDataSource<TaxableValue>(taxableValue);
    this.dataSourceTaxableTable._renderChangesSubscription;
    this.clickedRowsSubtotal = new Set<TaxableValue>();
    this.clickedRowsStock.clear();//privious rows clear
    this.filterProductName = '';// input field search product name clear
    this.dataSourceListOfProduct = new MatTableDataSource<Products>(produtcs);//adding product data on product table
    this.dataSourceListOfProduct._renderChangesSubscription;
    this.dataSourceStock.filter = "";//filter clear
  }

  // ******************************************************************************************************************************* 
  // ********************************************-------taxable table-------************************************************ 
  taxableColumns = ['taxableProductName', 'cgstTax', 'cgstAmount', 'sgstTax', 'sgstAmount', 'igstTax', 'igstAmount', 'total'];

  dataSourceTaxableTable = new MatTableDataSource<TaxableValue>(taxableValue);
  clickedRowsSubtotal = new Set<TaxableValue>();

  calculatePercent(price: number, percentage: number): number {
    return (price * (percentage) / 100);
  }

  ngDoCheck(): void {


  }
  refreshPage() {
    this.partyDisplay = "display:none";//table def(block)
    this.stockDisplay = "display:none";//table def(block)
    this.addStockbtn = "display:block";//add product button def(block)
    this.produtcsDisplay = "display:block";//product table def(block)
    this.formField = "display:block";//product table def(block)
    this.subTotal = "display:block";//product table def(block)
    this.taxableTableDisplay ="display:block";//product table def(flex)
  }
  addStock() {
    this.partyDisplay = "display:none";//table def(block)
    this.stockDisplay = "display:block";//table def(block)
    this.addStockbtn = "display:none";//add product button def(block)
    this.produtcsDisplay = "display:none";//product table def(block)
    this.formField = "display:none";//product table def(block)
    this.subTotal = "display:none";//product table def(block)
    this.taxableTableDisplay = "display:none";//product table def(flex)
    this.getStocks();

  }

  // ``````````````````````````````````````````````````````````EMI`````````````````````````````````````````
  // Emi and Service Implements
  emiFormDisplay ="display:block";
  emiTableDisplay ="display:block";
  serviceTableDisplay ="display:block";

  emiColumns = ['emiNo', 'emiDate', 'emiAmount', 'emiMessage'];
  dataSourceEmiTable = new MatTableDataSource<Emi>(emi);
  clickedRowsEmi = new Set<Emi>();

  serviceColumns = ['psNo', 'psDate', 'psEngineerName', 'psMessage'];
  dataSourceServiceTable = new MatTableDataSource<ProductServices>(productServices);
  clickedRowsService = new Set<ProductServices>();

  isEmi() {

    if (this.salesVoucherForm.get('transactionalAccount')?.value === 'default') {
      console.log('Default value is selected.');
      this.emiFormDisplay = "display:none";
      this.emiTableDisplay = "display:none";
      this.serviceTableDisplay = "display:none";
    } else if (this.salesVoucherForm.get('transactionalAccount')?.value === 'Sundry Debtors') {
      this.emiFormDisplay = "display:block";
      this.emiTableDisplay = "display:block";
      if(Number(this.salesVoucherForm.get('transactionAmount')?.value) <= 0){
        this.installmentRangeNumber=1;
      }
      this.calculateEmi();


    } 
    else {
        this.calculateService();
     


    }


  }
  // re-initialized service,emi
  calculateEmi() {
this.installmentAmount = 0;
      emi = [];
      productServices = [];
      if (Number(this.salesVoucherForm.get('transactionAmount')?.value) != 0 &&Number(this.emiProcessingFee) !== 0 && Number(this.downPaymet) !== 0) {
        if (Number(this.installmentRangeNumber) !== 0) {
          this.installmentAmount += ((Number(this.salesVoucherForm.get('transactionAmount')?.value) + Number((this.emiProcessingFee))) -
            Number((this.downPaymet))) / Number((this.installmentRangeNumber));
        } else {
          this.installmentAmount += (Number(this.salesVoucherForm.get('transactionAmount')?.value) + Number((this.emiProcessingFee))) -
            Number((this.downPaymet));
        }
      } else if (Number(this.emiProcessingFee) === 0 && Number(this.downPaymet) === 0) {
        if (Number(this.installmentRangeNumber) !== 0) {
          this.installmentAmount += Number(this.salesVoucherForm.get('transactionAmount')?.value) / Number(this.installmentRangeNumber);
        } else {
          this.installmentAmount += Number(this.salesVoucherForm.get('transactionAmount')?.value);
        }
      }
      else if (Number(this.emiProcessingFee) !== 0 && Number(this.downPaymet) === 0) {
        if (Number(this.installmentRangeNumber) !== 0) {
          this.installmentAmount += (Number(this.salesVoucherForm.get('transactionAmount')?.value) + Number(this.emiProcessingFee)) / Number(this.installmentRangeNumber);
        } else {
          this.installmentAmount += (Number(this.salesVoucherForm.get('transactionAmount')?.value) + Number(this.emiProcessingFee));

        }
      }
      else if (Number(this.emiProcessingFee) === 0 && Number(this.downPaymet) !== 0) {
        if (Number(this.installmentRangeNumber) !== 0) {
          this.installmentAmount += (Number(this.salesVoucherForm.get('transactionAmount')?.value) - Number(this.downPaymet)) / Number(this.installmentRangeNumber);
        }
        else {
          this.installmentAmount += (Number(this.salesVoucherForm.get('transactionAmount')?.value) - Number(this.downPaymet));
        }
      }
      let emi_Date = new Date(this.emiForm.get('installmentDate')?.value);
      for (let range: number = 0; range < Number(this.installmentRangeNumber); range++) {
        emi_Date.setMonth((emi_Date.getMonth()) + 1);
        emi.push({
          emiNo: range + 1,
          emiDate: String(this.datePipe.transform(emi_Date, 'yyyy-MM-dd')),
          emiAmount: this.installmentAmount,
          emiMessage: 'Dear Customer: Your Next Emi Date On ' + String(this.datePipe.transform(emi_Date, 'yyyy-MM-dd')) + ' Rs.' + this.installmentAmount,
          emiStatus: "Pending",
          emiSmsStatus: true
        })
      }
      for (let items: number = 0; items < produtcs.length; items++) {
        let serviceDate = new Date(this.salesVoucherForm.get('fieldTransactionDate')?.value);

        let serviceRange = ~~(Number(produtcs[items].productMonthOfWarranty) / Number(produtcs[items].productNoOfService))
        for (let range: number = 0; range < Number(produtcs[items].productNoOfService); range++) {
          if (serviceDate.getMonth() === 0) {
            serviceDate.setMonth((serviceDate.getMonth()) + (Number(serviceRange) - 1))
          } else {
            serviceDate.setMonth((serviceDate.getMonth()) + (Number(serviceRange)))
          }
          productServices.push({
            psNo: range + 1,
            psDate: String(this.datePipe.transform(serviceDate, 'yyyy-MM-dd')),
            psEngineerName: "",
            psStatus: "Pending",
            psMessage: 'Dear Customer: Your Next Service Date On ' + String(this.datePipe.transform(serviceDate, 'yyyy-MM-dd'))
          })
        }
      }
      this.dataSourceEmiTable = new MatTableDataSource<Emi>(emi);
      this.clickedRowsEmi = new Set<Emi>();
      this.dataSourceServiceTable = new MatTableDataSource<ProductServices>(productServices);
      this.dataSourceServiceTable._renderChangesSubscription;
      this.clickedRowsService = new Set<ProductServices>();
    
  }
  // re-initialized service
  calculateService() {

    productServices = [];

    for (let items: number = 0; items < produtcs.length; items++) {

      let serviceDate = new Date(this.salesVoucherForm.get('fieldTransactionDate')?.value);
      let serviceRange = ~~(Number(produtcs[items].productMonthOfWarranty) / Number(produtcs[items].productNoOfService))
      for (let range: number = 0; range < Number(produtcs[items].productNoOfService); range++) {
        if (serviceDate.getMonth() === 0) {
          serviceDate.setMonth((serviceDate.getMonth()) + (Number(serviceRange) - 1))
        } else {
          serviceDate.setMonth((serviceDate.getMonth()) + (Number(serviceRange)))
        }

        productServices.push({
          psNo: range + 1,
          psDate: String(this.datePipe.transform(serviceDate, 'yyyy-MM-dd')),
          psEngineerName: "",
          psStatus: "Pending",
          psMessage: 'Dear Customer: Your Next Service Date On ' + String(this.datePipe.transform(serviceDate, 'yyyy-MM-dd'))
        })
      }
    }
    this.dataSourceServiceTable = new MatTableDataSource<ProductServices>(productServices);
    this.dataSourceServiceTable._renderChangesSubscription;
    this.clickedRowsService = new Set<ProductServices>();
  }

  createSales() {
  

    let transectionalAccounts: TransectionalAccounts = {
      transactionAccountName: this.salesVoucherForm.get('transactionalAccount')?.value,
      transactionAmount: Number(this.salesVoucherForm.get('transactionAmount')?.value)

     

    };
    // let inventoryJournal: InventoryJournal[] = [];
    let inventoryJournal: any[] = [];
    // let bookDetails: BookDetails[] = [];
    let bookDetails: any[] = [];
    let sales: Sales;
    // let salesServiceEmi: SalesServiceEmi;
    for (let i = 0; i < produtcs.length; i++) {
      bookDetails.push({
        // bookDetailsId:0,//primary Key Of BookDetails Which is manage by backend api
        // bookDetailsBookInfo_Ref:0,//foreign Key Of (BookInfo Id) Which is manage by backend api
        bookDetailsInventoryItems_Ref: produtcs[i].productNo,//foreign Key Of (InventoryItems Id) Which is manage by backend api
        bookDetailsMolelNo: produtcs[i].productModel,
        iiMonthOfWarranty: produtcs[i].productMonthOfWarranty,
        iiNoOfService: produtcs[i].productNoOfService,
        iiHsn: produtcs[i].productHsn,
        iiParticular: produtcs[i].productName,
        bookDetailsUnit: "Pcs",
        bookDetailsUnitValue: produtcs[i].productQty,
        bookDetailsTradDiscount: produtcs[i].productDiscount,
        bookDetailsTradDiscountAmount: produtcs[i].productDiscount,
        bookDetailsParticularAmount: produtcs[i].productTotalAmount,
        bookDetailsCgst: (Number(produtcs[i].productCgstPercent)),
        bookDetailsSgst: (Number(produtcs[i].productSgstPercent)),
        bookDetailsIgst: (Number(produtcs[i].productIgstPercent)),
        bookItemsSerialNo: [{ serialNo: '' }],
        bookDetailsCgstAmount: this.calculatePercent(
          this.calculatePercent(Number(produtcs[i].productSalesPrice), (100 - Number(produtcs[i].productDiscount))), Number(produtcs[i].productCgstPercent)) * Number(produtcs[i].productQty),
        bookDetailsSgstAmount: this.calculatePercent(
          this.calculatePercent(Number(produtcs[i].productSalesPrice), (100 - Number(produtcs[i].productDiscount))), Number(produtcs[i].productSgstPercent)) * Number(produtcs[i].productQty),
        bookDetailsIgstAmount: this.calculatePercent(
          this.calculatePercent(Number(produtcs[i].productSalesPrice), (100 - Number(produtcs[i].productDiscount))), Number(produtcs[i].productIgstPercent)) * Number(produtcs[i].productQty),
      })
      inventoryJournal.push({
        ij_iiId: produtcs[i].productNo,//ij_iiId is the gurenge  key and here productNo is the Id of the InventoryItems
        ijDate: String(this.salesVoucherForm.get('fieldTransactionDate')?.value),
        ijPartyName: this.salesVoucherForm.get('fieldPartyAccount')?.value,
        ijVoucherType: "Sales",
        // ijVoucherNo: 0,//Voucher no Will be Set by API Implementation
        ijInwardQty: 0,
        ijJOutwardAmount: 0,
        ijJInwardAmount:((Number(produtcs[i].productTotalAmount) * (Number(produtcs[i].productFinalGst) + 100)) / 100),
        ijJOutwardQty: produtcs[i].productQty
        
      })

    }
    let product: Product[] = [];
    // let product: any[] = [];
    let newProductservices: ProductServices[] = [];
    let j = 0, k = 0;
    for (let items: number = 0; items < produtcs.length; items++) {
      k += produtcs[items].productNoOfService;
      for (; j < k; j++) {
        newProductservices.push({
          psEngineerName: productServices[j].psEngineerName,
          psNo: productServices[j].psNo,
          psDate: productServices[j].psDate,
          psStatus: "Pending",
          psMessage: productServices[j].psMessage,
          serviceProductSerialNo: [{ serialNo: 'xxxxxxxxx' }]
        })
      }
      product.push({
        ps_AccountId: this.accountId,
        ps_AuthorId: 1,
        psProductName: produtcs[items].productName,
        psProductModel: "xx034",
        psProductSerialNo: "xxxxx",
        psProductAge: 0,
        psProductValue: produtcs[items].productTotalAmount,
        psType: "Warranty",
        psMonthOfWarranty: produtcs[items].productMonthOfWarranty,
        psTotalService: produtcs[items].productNoOfService,
        productServices: newProductservices
      })

    }
    // if (this.transactionalAccount?.value === 'Sundry Debtors') {

    sales = {
      accountId: this.accountId,
      userId: 1,
      partyAcName: this.salesVoucherForm.get('fieldPartyAccount')?.value,
      transectionDate: this.salesVoucherForm.get('fieldTransactionDate')?.value,
      naration: this.salesVoucherForm.get('fieldNaration')?.value,
      product: product,
      transectionalAccounts,
      bookDetails,
      inventoryJournal: inventoryJournal,
      emi: emi
    }
    if(this.salesVoucherForm.valid){
    this.service.addSales(sales).subscribe({
      next: (value) => {

      },
      error: (err) => {
        if (err.status === 400) {
          alert('Transaction Failed! Please check your input data.');
        } else if (err.status === 401) {
          alert('Authentication failed. Please log in.');
        } else {
          alert('Transaction Failed! Something went wrong. Please try again later.');
        }
      },
      complete: () => {
        alert("Transaction Successful!")
        this.refresh();
      }
    })
  }
  else{
    alert('Transaction Failed! Please fill in all required fields.');
  }}


// validation
getErrorMessagePartyName(controlName: string): string | null {
  const control = this.salesVoucherForm.get(controlName);
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
  const control = this.salesVoucherForm.get(controlName);
  return control
    ? this.validationService.getErrorMessageDate(
        control,
        '*',
        '*'
      )
    : null;
}
getErrorMessageSelectTransectionAcc(controlName: string): string | null {
  const control = this.salesVoucherForm.get(controlName);
  return control
    ? this.validationService.getErrorMessageSelect(control, '*')
    : null;
}
getErrorMessageTransectionAmount(controlName: string): string | null {
  const control = this.salesVoucherForm.get(controlName);
  return control
    ? this.validationService.getErrorMessageNumberDecimal(control, '*','*','*','*')
    : null;
}
// Emi validation
getErrorMessageEmiProcessingFee(controlName: string): string | null {
  const control = this.emiForm.get(controlName);
  return control
    ? this.validationService.getErrorMessageNumber(control, '*','*')
    : null;
}
getErrorMessageDdownPaymet(controlName: string): string | null {
  const control = this.emiForm.get(controlName);
  return control
    ? this.validationService.getErrorMessageNumber(control, '*','*')
    : null;
}
getErrorMessageInstallmentRangeMinNumber(controlName: string): string | null {
  const control = this.emiForm.get(controlName);
  return control
    ? this.validationService.getErrorMessageNumberMin(control, '*','*')
    : null;
}
getErrorMessageInstallmentAmount(controlName: string): string | null {
  const control = this.emiForm.get(controlName);
  return control
    ? this.validationService.getErrorMessageNumber(control, '*','*')
    : null;
}
getErrorMessageInstallmentDate(controlName: string): string | null {
  const control = this.emiForm.get(controlName);
  return control
    ? this.validationService.getErrorMessageDate(
        control,
        '*',
        '*'
      )
    : null;
}
}


