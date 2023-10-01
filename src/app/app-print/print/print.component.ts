import { Component, Injectable, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/services/service.service';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { InvoiceList } from 'src/app/model/invoicelist';
import { every } from 'rxjs';
let invoiceData: InvoiceList[] = [];
@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  searchingParty = '';
  constructor(
    private service: Service,
    private dialog: MatDialog,
    private route: Router,
  ) { }
  printCloumn = ['accountId', 'accountName', 'voucherDate', 'voucherAmount', 'voucherType', 'editAction', 'printAction', 'deleteAction']
  printDataSource = new MatTableDataSource<InvoiceList>(invoiceData);
  clickedRows = new Set<InvoiceList>();
  searchingPartyEvent($event: any) {
    this.printDataSource.filter = $event.target.value;
  }
  getInvoiceListToPrint() {
    this.service.getInvoiceListToPrint().subscribe({
      next: (value) => {
        invoiceData = value;
      },
      error: (e) => {
      },
      complete: () => {
        this.clickedRows.clear();
        this.printDataSource = new MatTableDataSource<InvoiceList>(invoiceData);
        this.printDataSource._renderChangesSubscription;
        this.clickedRows = new Set<InvoiceList>();

      },
    })
  }


  ngOnDestroy(): void {
    invoiceData = [];
    this.printDataSource = new MatTableDataSource<InvoiceList>(invoiceData);
    this.printDataSource._renderChangesSubscription;
  }
  refresh() {
    invoiceData = [];
    this.printDataSource = new MatTableDataSource<InvoiceList>(invoiceData);
    this.printDataSource._renderChangesSubscription;
  }

  ngOnInit(): void {
    this.getInvoiceListToPrint();
  }
  printingAction(element: any) {
        let newElement: InvoiceList;
        newElement = element;
   
        this.service.getInvoicePdf( newElement.bookInfoFolio_Ref).subscribe({
          next: (data) => {
            let fileUrl = window.URL.createObjectURL(data);
            window.open(fileUrl, '_blank', 'location=yes,height=600,width=800,scrollbars=yes,status=yes');//open link in new windo 
            // window.open(fileUrl);//open link in new tab in current windo 
          }
          , error: (e) => {
            console.log(e)

          }, complete: () => {
            console.log("getting data done!")
          }
        })
  }

  updateVoucher(element: any) {
    let getData: InvoiceList;
    getData = element;
    // console.log(getData.accountName)

    this.route.navigate(['home/salesEdit'], { state: { data: getData } });


  }
  deleteInvoice(element: any) {
    let getData: InvoiceList;
    getData = element;
    this.service.deleteInvoice(getData.bookDetailsBookInfo_Ref).subscribe({
      next: (value) => {
        invoiceData = value;
      },
      error: (e) => {
      },
      complete: () => {
        this.refresh();
        this.getInvoiceListToPrint();

      },
    })
  }
}



