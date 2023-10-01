import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/app-alert-message/alert/alert.component';
import { Service } from 'src/app/services/service.service';


@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css']
})
export class CreatePartyComponent implements OnInit {
  isGstNo = "display:none";
  isGstIn: boolean = true;
  date = new Date;
  partyForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: Service,
    public dialogRef: MatDialogRef<CreatePartyComponent>,
    private dialog: MatDialog,
  ) { }



  get partyName() {
    return this.partyForm.get('accountName') ;

  }
  get partyContact1() {
    return this.partyForm.get('partyContactNo1');

  }
  get partyContact2() {
    return this.partyForm.get('partyContactNo2');

  }
  get partyEmail() {
    return this.partyForm.get('partyEmailId');

  }
  get partyOpeningBalance() {
    return this.partyForm.get('partyOpeningBalance');

  }
  get partygstNo() {
    return this.partyForm.get('partyGstNo');

  }

  get partyBillingAdd() {
    return this.partyForm.get('partyBillingAddress');

  }
  get partyShipingAdd() {
    return this.partyForm.get('partyShipingAddress');

  }
  formSubmit() {
    if (!this.isGstIn) {
      this.partyForm.value.partyGstNo = "";
    }

    if(this.partyForm.invalid){
      
        if (this.partyName && this.partyName.invalid) {

          (document.querySelector('#name') as HTMLElement).style.borderColor = '#FF0A0A';
          (document.querySelector('#labelName') as HTMLElement).style.color = '#FF0A0A';
          // (document.querySelector('#name-span') as HTMLElement).style.color = '#FF0A0A';
          // alert("Party Name should not empty!")
          this.openDialogAlert("Party Name should not empty!","Please enter party name to continue...");
    
        }
        else {
          (document.querySelector('#name') as HTMLElement).style.borderColor = 'black';
          (document.querySelector('#labelName') as HTMLElement).style.color = 'black';
          (document.querySelector('#name-span') as HTMLElement).style.color = 'black';
        }
        
      if (this.partyContact1 && this.partyContact1.invalid) {
        (document.querySelector('#mobile1') as HTMLElement).style.borderColor = '#FF0A0A';
        (document.querySelector('#labelMobile1') as HTMLElement).style.color = '#FF0A0A';
        this.openDialogAlert("Mobile No. should not empty!","Please enter 10 Digit Mobile No. to continue...");
  
      }
      else {
        (document.querySelector('#mobile1') as HTMLElement).style.borderColor = 'black';
        (document.querySelector('#labelMobile1') as HTMLElement).style.color = 'black';
        (document.querySelector('#mobile1-span') as HTMLElement).style.color = 'black';
      }
      
      }
    
    else
    { 
      this.service.addPartyAccounts(this.partyForm?.value)
      .subscribe({
        next: (value) => { 
        
        },
        error: (e) => {
          let ee:any=e
          alert(ee.value)
         },
        complete: () => {
          this.dialogRef.close();
        }
      })}


    // })

  }
  sameAddress(e: any) {
    if (e.target.checked) {
      this.partyShipingAdd?.setValue(String(this.partyBillingAdd?.value));
    } else {
      this.partyShipingAdd?.setValue('');
    }
  }

  ngOnInit(): void {
    this.partyForm = this.fb.group({
      accountName: new FormControl(null,[Validators.required,Validators.pattern('^[A-Za-z][A-Za-z ]*$')]),
      partyContactNo1: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      partyContactNo2: new FormControl(),
      partyEmailId: new FormControl(),
      partyGstNo: new FormControl(),
      partyBillingAddress: new FormControl(),
      partyShipingAddress: new FormControl(),
      partyOpeningBalance: new FormControl(0.0),
      partyAreaCode: new FormControl(),
      partyDob: new FormControl(this.date),
      partyBloodGroup: new FormControl(),
      partyAadharNo: new FormControl(),
      partyPanNo: new FormControl(),
    })
  }
  isGstRegister(getValue: any) {

    if (getValue === "Register") {
      this.isGstNo = "display:inline";
      this.isGstIn = true;

    }
    else {
      this.isGstNo = "display:none";
      this.isGstIn = false;
    }

  }
  dialogClose() {
    this.dialogRef.close();
  }

  
  // Custom Form validator
  nameValid() {
    
    if (this.partyName && this.partyName.invalid) {
      // (document.querySelector('#name') as HTMLElement).style.borderColor = '#DC381F';
      // (document.querySelector('#labelName') as HTMLElement).style.color = '#DC381F';
      (document.querySelector('#name-span') as HTMLElement).style.color = '#FF0A0A';
      

    }
    else {
      (document.querySelector('#name') as HTMLElement).style.borderColor = 'black';
      (document.querySelector('#labelName') as HTMLElement).style.color = 'black';
      (document.querySelector('#name-span') as HTMLElement).style.color = 'black';
    }
  }

  mobileNoValidator() {
    
    if (this.partyContact1 && this.partyContact1.invalid) {
      // (document.querySelector('#name') as HTMLElement).style.borderColor = '#DC381F';
      // (document.querySelector('#labelName') as HTMLElement).style.color = '#DC381F';
      (document.querySelector('#mobile1-span') as HTMLElement).style.color = '#FF0A0A';
      

    }
    else {
      (document.querySelector('#name') as HTMLElement).style.borderColor = 'black';
      (document.querySelector('#labelName') as HTMLElement).style.color = 'black';
      (document.querySelector('#mobile1-span') as HTMLElement).style.color = 'black';
    }
  }


  openDialogAlert(alert_text1:string,alert_text2:string) {

    const dialogRef = this.dialog.open(AlertComponent, {
      width: '50%',
      height: '20%',
      data: [{alert_text1},{alert_text2}]
    });
  }

}


