import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddInventoryItemsDTO } from 'src/app/model/add-inventory';
import { Service } from 'src/app/services/service.service';
import { UpdateStockComponent } from '../update-stock/update-stock.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateStockComponent } from '../create-stock/create-stock.component';
import { UpdateInventoryItemsDTO } from 'src/app/model/update-inventory';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css']
})
export class ViewStockComponent implements OnInit {
  searchingProduct = '';
  stock: UpdateInventoryItemsDTO[] = []
  stockColumns = ['IiId', 'iiParticular', 'iiHsn','iiModelNo', 'iiQty', 'iiMrp', 'iiPurchaseAmount', 'iiSalesAmount', 'action'];
  dataSourceStock = new MatTableDataSource<UpdateInventoryItemsDTO>(this.stock);
  clickedRowsStock = new Set<UpdateInventoryItemsDTO>();
  constructor(
    private service: Service,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getStocks();
  }
  searchingProductEvent($event: any) {
    this.dataSourceStock.filter = $event.target.value;
  }
  getStocks() {
    this.service.getStocks().subscribe({
      next: (value) => {
        this.stock = value;
      },
      error: (e) => {},
      complete: () => {
        this.dataSourceStock = new MatTableDataSource<UpdateInventoryItemsDTO>(this.stock);
        this.dataSourceStock._renderChangesSubscription;
        this.clickedRowsStock = new Set<UpdateInventoryItemsDTO>();
      }
    })
  }
  openDialogUpdateStock(element: any) {

    const dialogRef = this.dialog.open(UpdateStockComponent, {
      width: '100%',
      height: '100%',
      data: { element }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getStocks();

    })
  }
  openDialogCreateNewStock() {

    {

      const dialogRef = this.dialog.open(CreateStockComponent, {
        width: '100%',
        height: '100%',
        data: []
      });
      dialogRef.afterClosed().subscribe((response: any) => {
        this.getStocks();

      })
    }
  }
}
