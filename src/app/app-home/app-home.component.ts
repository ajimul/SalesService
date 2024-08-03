import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../services/service.service';
import { invoiceHeader } from '../model/InvoiceHeader';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {
  sidebar: boolean = false;
  organizationName:string='';
 
  data?:invoiceHeader[]=[];
  constructor(private service: Service,private route: Router) { 
    
   }

  ngOnInit(): void {
    this.getInvoiceHeader();
  }
   logout(){
     this.service.logout()
  }
  
  sidebar_Open_Closer() {
    if (this.sidebar) {
      this.sidebar = false;

    } else {
      this.sidebar = true;
    }

  }
  menue_click(){
    this.sidebar = false;
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
this.organizationName=e.organizationName;
      }); 
      
    },
  })
}
}

