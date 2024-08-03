import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../services/service.service';
import { CustomValidationService } from '../app-validator/custom-validation-service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-app-bom',
  templateUrl: './app-bom.component.html',
  styleUrls: ['./app-bom.component.css']
})
export class AppBomComponent implements OnInit{

  constructor(
    // private datePipe: DatePipe,
    private route: Router,
    private service: Service,
    private validationService: CustomValidationService,
    public fb: FormBuilder){

  }

  ngOnInit(): void {
    
  }
  ngOnDestroy() {

  }
  refresh(){

  }
  //validation

}
