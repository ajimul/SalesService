import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../services/service.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {
  sidebar: boolean = false;

  constructor(private service: Service,private route: Router) { 
    
   }

  ngOnInit(): void {
  }
   logout(){
     this.service.Logout()
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
}

