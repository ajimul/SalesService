import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-items-group',
  templateUrl: './create-items-group.component.html',
  styleUrls: ['./create-items-group.component.css']
})
export class CreateItemsGroupComponent implements OnInit {
  constructor(private service: Service, public dialog: MatDialog,
    private formBuilder: FormBuilder, public fb: FormBuilder, public dialogRef: MatDialogRef<CreateItemsGroupComponent>) { }
  itemsGroup = this.fb.group({
    groupName: new FormControl()

  })


  get groupName() {
    return this.itemsGroup.get('groupName');
  }

  ngOnInit(): void {

  }
  formSubmit() {
    this.addItemGroup();
  }

  addItemGroup() {
    this.service.addItemGroup(this.groupName?.value)
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