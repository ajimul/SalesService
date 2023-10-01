import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InventoryGroupLocation } from 'src/app/model/inventory-group';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-items-location',
  templateUrl: './create-items-location.component.html',
  styleUrls: ['./create-items-location.component.css']
})
export class CreateItemsLocationComponent implements OnInit {
  itemLocation: InventoryGroupLocation[] = [];
  // gName: string = ''
  constructor(private service: Service, public dialog: MatDialog,
    private formBuilder: FormBuilder, public fb: FormBuilder, public dialogRef: MatDialogRef<CreateItemsLocationComponent>) { }
  itemsLocation = this.fb.group({
    locationName: new FormControl()

  })


  get locationName() {
    return this.itemsLocation.get('locationName');
  }

  ngOnInit(): void {

  }
  formSubmit() {
    this.addItemLocation();
  }

  addItemLocation() {
    this.service.addItemLocation(this.locationName?.value)
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