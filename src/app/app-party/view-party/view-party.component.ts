import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/services/service.service';
import { UpdatePartyComponent } from '../update-party/update-party.component';
import { CreatePartyComponent } from '../create-party/create-party.component';
import { ArrayType } from '@angular/compiler';
import { timeInterval } from 'rxjs';
import { PartyDetailsDTO } from 'src/app/model/party';

@Component({
  selector: 'app-view-party',
  templateUrl: './view-party.component.html',
  styleUrls: ['./view-party.component.css']
})
export class ViewPartyComponent implements OnInit {
  searchingParty = '';
  party: PartyDetailsDTO[] = []

  constructor(
    private service: Service,
    private dialog: MatDialog,
  ) { }
  partyColumns = ['accountName', 'accountId', 'partyContactNo1', 'partyEmailId', 'partyBillingAddress', 'partyShipingAddress', 'action'];
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
      }
    })
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

    const dialogRef = this.dialog.open(UpdatePartyComponent, {
      width: '100%',
      height: '100%',
      data: { element }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getPartyAccounts();
    })
  }
  searchingPartyEvent($event: any) {
    this.dataSourcePartyAccounts.filter = $event.target.value;
  }

  ngOnInit(): void {
    this.getPartyAccounts();
  }



}
