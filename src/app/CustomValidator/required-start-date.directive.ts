import { Directive } from '@angular/core';
import { FormsModule,NG_VALIDATORS,ValidatorFn,FormGroup, ValidationErrors,Validator,AbstractControl, NgForm, FormControl} from '@angular/forms';

@Directive({
  selector: '[appStartEndDateComparison]',
  providers: [{provide: NG_VALIDATORS, useExisting: StartEndDateComparisonDirective, multi: true}]
})
export class StartEndDateComparisonDirective implements Validator  {
  validate(control: AbstractControl): ValidationErrors {
    
    return StartEndDateComparisonValidator(control)
  }

  constructor() { }

}
export const StartEndDateComparisonValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  
  const stdate = control.get('startdate');
  const endate = control.get('enddate');
  if(endate !=null)
  {
    if (endate.value==null || endate.value==='')
         return null;
    else{
    
      if(stdate==null || stdate.value==='' || stdate.value>endate.value)
      {
        return {appStartEndDateComparison:{valid:false}};
      }
      else
      {
      return null;
      }
     
    }

  }
  
  
 };

