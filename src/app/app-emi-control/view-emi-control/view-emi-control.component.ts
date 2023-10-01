import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmiConfig } from 'src/app/model/emiCollection';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-view-emi-control',
  templateUrl: './view-emi-control.component.html',
  styleUrls: ['./view-emi-control.component.css']
})
export class ViewEmiControlComponent implements OnInit {
  accountId!: number;
  accountName!: string;
  partyDetailsId!: number;
  party_ac_refId!: number;
  emiId!: number;
  emiNo!: number;
  emiAmount!: number;
  emiStatus!: string;
  emiDate!: string;
  emiMessage!: string;
  emiSmsStatus!: boolean;
  emi_BiId!: number;

  searchingParty = '';
  emi: EmiConfig[] = []

  constructor(
    private service: Service,
    private dialog: MatDialog,
  ) { }

  EmiConfigTableColumn = ['partyName', 'emiNo', 'emiAmount','emiMessage', 'emiStatus', 'emiSmsStatus', 'emiDate', 'action'];
  EmiConfigDaraSource = new MatTableDataSource<EmiConfig>(this.emi);
  clickEmiConfigTableRow = new Set<EmiConfig>();
  searchingPartyEvent($event: any) {
    this.EmiConfigDaraSource.filter = $event.target.value;
  }

  getEmiConfig() {

    this.emi = [];
    this.service.getEmiConfig().subscribe((response: any) => {

      if (response) {
        this.emi = response;
        this.EmiConfigDaraSource = new MatTableDataSource<EmiConfig>(response);
        this.EmiConfigDaraSource._renderChangesSubscription;
        this.clickEmiConfigTableRow = new Set<EmiConfig>();

      }

    })

  }


  ngOnInit(): void {

    this.getEmiConfig();


  }
  UpdateAction(element:any) {
    let data:Data;
    data=element;
    this.service.updateEmiConfig(data).subscribe({
      next:(value) =>{ },
      error:(e) =>{console.log(e)},
      complete:() =>{ 
        this.getEmiConfig();
      },
    })

  }

}


interface Data {
  accountId: number,
  accountName: string,
  emiAmount: number,
  emiDate: string,
  emiId: number,
  emiMessage: string,
  emiNo: number,
  emiSmsStatus: boolean,
  emiStatus: string,
  emi_BiId: number,
  partyDetailsId: number,
  party_ac_refId: number,
}