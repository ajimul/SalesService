import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidation {
  
    static customName(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const symbolRegex = /^[^\w\s]/;
        const numberRegex = /^\d/;

        if (value === null || value === undefined) {
          return null; 
        }
        if (symbolRegex.test(value)) {
          return { requiredSymbol: true };
        }
        if (numberRegex.test(value)) {
          return { requiredNumber: true };
        }
        if (value.trim().length !== value.length) {
          return { requiredBlankSpace: true };
        }
        if (value.trim().length < 3) {
          return { minlength: true };
        } else {
          return null;
        }
      };
    }
    static customText1(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        
        const value = control.value;
        if (value === null || value === undefined || typeof value !== 'string') {
          return null; 
        }
        if (value.trim().length !== value.length) {
          return { requiredBlankSpace: true };
        }
        if (value.trim().length < 3) {
          return { minlength: true };
        } else {
          return null;
        }
      };
    }
    static customText2(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        
        const value = control.value;
        if (value === null || value === undefined || typeof value !== 'string') {
          return null; 
        }
        if (value.trim().length !== value.length) {
          return { requiredBlankSpace: true };
        }
        if (value.trim().length < 1) {
          return { minlength: true };
        } else {
          return null;
        }
      };
    }
  
    static customNumber(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const invalidCharsRegex = /[^0-9]/; 
        if (value === null || value === undefined || value === '' || isNaN(value)) {
          return { required: true };
        }
        if (invalidCharsRegex.test(value)) {
          return { requiredNumber: true };
        }
        return null;
      };
    }
    static customNumberMin1(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const invalidCharsRegex = /[^0-9]/; 
    
        if (value === null || value === undefined || value === '' || isNaN(value) || value < 1) {
          console.log("Value is not valid or less than 1:", value);
          return { required: true};
        }
    
        if (invalidCharsRegex.test(value)) {
          console.log("Invalid characters found:", value);
          return { requiredNumber: true };
        }
    
        return null;
      };
    }
    
  
    static customDecimal(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const invalidCharsRegex = /[^0-9.]+(\.\d+)?$/;
        if (value === null || value === undefined || value === '' || isNaN(value)) {
          return { required: true };
        }
        if (invalidCharsRegex.test(value)) {
          return { requiredNumber: true };
        }
        return null;
      };
    }
  
    static customMobileNo(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const invalidCharsRegex = /[^0-9]/;
        if (value === null || value === undefined || value === '' || isNaN(value)) {
          return { required: true };
        }
  
        if (invalidCharsRegex.test(value)) {
          return { requiredNumber: true };
        }
  
        if (value.length !== 10) {
          return { invalidPhoneNumber: true };
        }
        return null;
      };
    }
  
    static customDate(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        // Check if the value is a valid date
        if (!value || isNaN(Date.parse(value))) {
          return { invalidDate: true };
        }
        return null;
      };
    }
  
    static customZero(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;

        if (value === 0 || value === '0' || value === 0.0 || value === '0.0') {
          return { zeroAmount: true };
        }
        return null;
      };
    }
  
    static customCheckbox(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value !== true) {
          return { notChecked: true };
        }
        return null;
      };
    }
    static customSelect(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (!value || value === 'default') {
          return { invalidSelect: true };
        }
        return null;
      };
    }
  
    static customRadio(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
  

        if (value !== 'male' && value !== 'female') {
          return { invalidGender: true };
        }
        return null;
      };
    }
  }
  