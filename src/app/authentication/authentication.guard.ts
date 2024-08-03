import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from '../services/service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard  implements CanActivate {


  constructor(private service: Service, private route: Router) {
    service=service;

  }

  canActivate() {
 

        if (this.service.isLogged()) {
      return true;
    } else {
      this.route.navigate(['login']);
      return false;
     
    }
    // return true;
 
  }
  
}
