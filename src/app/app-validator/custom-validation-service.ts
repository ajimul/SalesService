import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  getErrorMessageName(control: AbstractControl,sms1:string,sms2:string,sms3:string,sms4:string,sms5:string): string | null {
    if (control.hasError('required')) {
      return sms1;
    }
    if (control.hasError('requiredSymbol')) {
      return sms2;
    }
    if (control.hasError('requiredNumber')) {
      return sms3;
    }
    if (control.hasError('requiredBlankSpace')) {
      return sms4;
    }
    if (control.hasError('minlength')) {
      return sms5;
    }
    return null;
  }
  getErrorMessageText1(control: AbstractControl,sms1:string,sms2:string,sms3:string): string | null {
    if (control.hasError('required')) {
      return sms1;
    }
    if (control.hasError('requiredBlankSpace')) {
      return sms2;
    }
    if (control.hasError('minlength')) {
      return sms3;
    }
    return null;
  }

  getErrorMessageNumber(control: AbstractControl,sms1:string,sms2:string): string | null {
    if (control.hasError('required')) {
      return sms1;
    }
    if (control.hasError('requiredNumber')) {
      return sms2;
    }
    return null;
  }
  getErrorMessageNumberMin(control: AbstractControl,sms1:string,sms2:string): string | null {
    if (control.hasError('required')) {
      return sms1;
    }
    if (control.hasError('requiredNumber')) {
      return sms2;
    }
    return null;
  }

  getErrorMessageNumberDecimal(control: AbstractControl,sms1:string,sms2:string,sms3:string,sms4:string): string | null {
    if (control.hasError('required')) {
      return sms1;
    }
    
    if (control.hasError('required')) {
      return sms2;
    }
    if (control.hasError('requiredNumber')) {
      return sms3;
    }
     return null;
  }

  getErrorMessageMobileNumber(control: AbstractControl,sms1:string,sms2:string,sms3:string): string | null {
    if (control.hasError('required')) {
      return sms1;
    }
    if (control.hasError('requiredNumber')) {
      return sms2;
    }
    if (control.hasError('invalidPhoneNumber')) {
      return sms3;
    }
    return null;
  }

  getErrorMessageDate(control: AbstractControl,sms1:string,sms2:string): string | null {
    if (control.hasError('required')) {
      return sms1;
    }
    if (control.hasError('invalidDate')) {
      return sms2;
    }
    return null;
  }

  getErrorMessageAmountZero(control: AbstractControl,sms1:string,sms2:string): string | null {
    if (control.hasError('required')) {
      return sms1;
    }
    if (control.hasError('zeroAmount')) {
      return sms2;
    }
    return null;
  }

  getErrorMessageCheckbox(control: AbstractControl,sms1:string): string | null {
  
    if (control.hasError('notChecked')) {
      return sms1;
    }
    return null;
  }
  getErrorMessageSelect(control: AbstractControl,sms1:string): string | null {
    if (control.hasError('invalidSelect')) {
      return sms1;
    }
    return null;
  }

  getErrorMessageRadioToogle(control: AbstractControl,sms1:string): string | null {

    if (control.hasError('invalidGender')) {
      return sms1;
    }
    return null;
  }
}
