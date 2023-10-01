import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/services/service.service';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { EmployeeDetailsDTO } from 'src/app/model/employee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  searchingEmployee = '';
  employee: EmployeeDetailsDTO[] = []

  constructor(
    private service: Service,
    private dialog: MatDialog,
  ) { }
  employeeColumns = ['accountName', 'accountId', 'empContactNo1', 'empEmailId', 'empBillingAddress', 'empShipingAddress', 'action'];
  dataSourceEmployee = new MatTableDataSource<EmployeeDetailsDTO>(this.employee);
  clickedRowsEmployee = new Set<EmployeeDetailsDTO>();
  getEmployee() {

    this.service.getEmployee().subscribe({
      next: (value) => { this.employee = value },
      error: (err) => { },
      complete: () => {
        this.dataSourceEmployee = new MatTableDataSource<EmployeeDetailsDTO>(this.employee);
        this.dataSourceEmployee._renderChangesSubscription
        this.clickedRowsEmployee = new Set<EmployeeDetailsDTO>();
      }
    }
    )  }

  openDialogCreateNewPartyAccount() {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '100%',
      height: '100%',
      data: []
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      this.service.getEmployee().subscribe((response: any) => {
        this.employee = response;
        this.dataSourceEmployee = new MatTableDataSource<EmployeeDetailsDTO>(response);
        this.clickedRowsEmployee = new Set<EmployeeDetailsDTO>();
      })
    })
  }
  openDialogUpdateEmployee(element: any) {

    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      width: '100%',
      height: '100%',
      data: { element }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.service.getEmployee().subscribe((response: any) => {
        this.employee = response;
        this.dataSourceEmployee = new MatTableDataSource<EmployeeDetailsDTO>(response);
        this.clickedRowsEmployee = new Set<EmployeeDetailsDTO>();
      })

    })
  }

  searchingEmployeeEvent($event: any) {
    this.dataSourceEmployee.filter = $event.target.value;
  }

  ngOnInit(): void {
    this.getEmployee();
  }

}
