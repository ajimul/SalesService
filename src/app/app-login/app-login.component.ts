import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../services/service.service';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {
  responsedata: any;
  constructor(private service: Service,private route: Router) { 
    localStorage.clear();
  }

  ngOnInit(): void {
  }
  loginform = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });


  Proceedlogin() {
    if (this.loginform.valid)
    {
     this.service.Proceddlogin(this.loginform.value)
     .subscribe(result => {
        this.responsedata = result;
        if (this.responsedata != null) {
          localStorage.setItem('token', this.responsedata.jwt);
          localStorage.setItem('refreshtoken', this.responsedata.refreshToken);
                // this.route.navigate(['home']);
          this.route.navigate(['home'], { replaceUrl: true });
               } else {
          alert("login Faield!");
        }
      });
    }
    this.route.navigate(['home'], { replaceUrl: true });

  }

  // CrosTest(){
  //   this.service.OriginTest().subscribe(result => {
  //     alert(result)
  //      });
  // }
}
