import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreatePartyComponent } from 'src/app/app-party/create-party/create-party.component';
import { UpdatePartyComponent } from 'src/app/app-party/update-party/update-party.component';
import { Service } from 'src/app/services/service.service';
import { PayEmiComponent } from '../pay-emi/pay-emi.component';
import { EmiCollection } from 'src/app/model/emiCollection';
import { EmiDetailComponent } from './emi-detail/emi-detail.component';

@Component({
  selector: 'app-emi-collection',
  templateUrl: './view-emi.component.html',
  styleUrls: ['./view-emi.component.css']
})
export class ViewEmiComponent implements OnInit {
  searchingParty = '';
  emi: EmiCollection[] = []

  constructor(
    private service: Service,
    private dialog: MatDialog,
  ) { }

  emiColumns = ['partyName','accountId', 'emiNo', 'emiAmount', 'emiStatus', 'emiDate', 'action'];
  dataSourceEmiList = new MatTableDataSource<EmiCollection>(this.emi);
  clickedRowsEmi = new Set<EmiCollection>();
  searchingPartyEvent($event: any) {
    this.dataSourceEmiList.filter = $event.target.value;
  }

  getEmiList() {
    this.emi = [];
    this.service.getEmiList().subscribe((response: any) => {
      if (response) {
        this.emi = response;
        this.dataSourceEmiList = new MatTableDataSource<EmiCollection>(response);
        this.dataSourceEmiList._renderChangesSubscription;
        this.clickedRowsEmi = new Set<EmiCollection>();
      }
    })

  }

  openDialogEmi_In_Details(element: any) {
    const emi_BiId = element.emi_BiId
    let totalPaidEmi: number = 0;
    let totalEmi: number = 0;
    let totalDue: number = 0;
    if (this.emi) {
      this.emi.forEach(e => {
        if (e.emi_BiId === emi_BiId) {
          totalEmi += 1;
          if (e.emiStatus !== 'Pending') {
            totalPaidEmi += 1;
          } else {
            totalDue += e.emiAmount;
            console.log('totalDue= ' + totalDue)
          }

        }

      });
    }
    this.dialog.open(EmiDetailComponent, {
      width: '100%',
      height: '80%',
      data: { element, totalEmi, totalPaidEmi, totalDue }
    });
  }

  ngOnInit(): void {

    this.getEmiList();


  }
  openDialogPayEmi(element: any) {

    const dialogRef = this.dialog.open(PayEmiComponent, {
      width: '100%',
      height: '60%',
      data: { element }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getEmiList();


    })


  }

}



