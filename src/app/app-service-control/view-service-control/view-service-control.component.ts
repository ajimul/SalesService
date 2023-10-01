import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductServiceConfig } from 'src/app/model/emiCollection';
import { EmployeeDetailsDTO } from 'src/app/model/employee';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-view-service-control',
  templateUrl: './view-service-control.component.html',
  styleUrls: ['./view-service-control.component.css']
})
export class ViewServiceControlComponent implements OnInit {
  accountId!: number;
  accountName!: string;
  partyDetailsId!: number;
  party_ac_refId!: number;
  emiId!: number;
  psNo!: number;
  psEngineerName!: number;
  psStatus!: string;
  psDate!: string;
  emiMessage!: string;
  psSmsStatus!: boolean;
  emi_BiId!: number;

  searchingParty = '';
  employee: EmployeeDetailsDTO[] = []
  ps: ProductServiceConfig[] = []

  constructor(
    private service: Service,
    private dialog: MatDialog,
  ) { }

  productServiceControl = ['partyName', 'psNo', 'psEngineerName','psMessage', 'psStatus', 'psSmsStatus', 'psDate', 'action'];


  productServiceControlDataSource = new MatTableDataSource<ProductServiceConfig>(this.ps);
  clickProductServiceControlTableRow = new Set<ProductServiceConfig>();
  searchingPartyEvent($event: any) {
    this.productServiceControlDataSource.filter = $event.target.value;
  }

  getProductServiceConfig() {

    this.ps = [];
    this.service.getProductServiceList().subscribe((response: any) => {

      if (response) {
        this.ps = response;
        this.productServiceControlDataSource = new MatTableDataSource<ProductServiceConfig>(response);
        this.productServiceControlDataSource._renderChangesSubscription;
        this.clickProductServiceControlTableRow = new Set<ProductServiceConfig>();

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
    )  }

  ngOnInit(): void {

    this.getProductServiceConfig();
    this.getEmployee();


  }
  UpdateAction(element:any) {
    let data:Data;
    data=element;
    this.service.updateProductServiceConfig(data).subscribe({
      next:(value) =>{ },
      error:(e) =>{console.log(e)},
      complete:() =>{ 
        this.getProductServiceConfig();
      },
    })

  }

}

interface Data {
  accountId: number,
  accountName: string,
  psEngineerName: number,
  psDate: string,
  psId: number,
  psMessage: string,
  psNo: number,
  psSmsStatus: boolean,
  psStatus: string,
  ps_Id: number,

}