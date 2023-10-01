import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { invoiceHeader } from 'src/app/model/InvoiceHeader';
import { Service } from 'src/app/services/service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  iHeader!:FormGroup;
   data?:invoiceHeader[]=[];
  constructor(private fb: FormBuilder,
    private service: Service) { }


get organizationName(){
  return this.iHeader.get('organizationName')?.value
}
get contactDetails(){
  return this.iHeader.get('contactDetails')?.value
}

  ngOnInit(): void {
    this.iHeader = this.fb.group({
      id: new FormControl(null),
      organizationName: new FormControl(null),
      contactDetails: new FormControl(null)
    })
    this.getInvoiceHeader();

   
  }

  getInvoiceHeader() {  this.service.getInvoiceHeader().subscribe({
      next:(value)=> {   
        this.data=value;
        
       },
      error:(e)=> {  
        console.log(e)     
      },
      complete:()=> {   
        this.data!.forEach(e => {
         
           this.iHeader = this.fb.group({
            id: new FormControl(e.id),
            organizationName: new FormControl(e.organizationName),
            contactDetails: new FormControl(e.contactDetails)
          })
        }); 
        
      },
    })
  }
  formSubmit() {
    this.service.addInvoiceHeader( this.iHeader!.value).subscribe({
      next:(value)=> {   
      },
      error:(e)=> {  
        console.log(e)     
      },
      complete:()=> {     
        alert("Update success!");
      },
    })
  }

}
