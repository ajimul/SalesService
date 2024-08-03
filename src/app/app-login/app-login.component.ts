import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../services/service.service';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css'],
})
export class AppLoginComponent implements OnInit {
  responsedata: any;
  constructor(private service: Service, private route: Router) {
    localStorage.clear();
  }

  ngOnInit(): void {}
  loginform = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    tenantOrClientId: new FormControl('', Validators.required),
    // username: new FormControl('demo', Validators.required),
    // password: new FormControl('admin', Validators.required),
    // tenantOrClientId: new FormControl('2', Validators.required),
  });

  login() {
    if (this.loginform.valid) {
      this.service.login(this.loginform.value).subscribe({
        next: (value) => {
          this.responsedata = value;
          if (this.responsedata != null) {
            localStorage.setItem('token', this.responsedata.jwt);
            localStorage.setItem(
              'refreshtoken',
              this.responsedata.refreshToken
            );
            // this.route.navigate(['home']);
            this.route.navigate(['home'], { replaceUrl: true });
          } else {
            alert('login Faield!');
          }
        },
        error: (error) => {},
        complete: () => {},
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
