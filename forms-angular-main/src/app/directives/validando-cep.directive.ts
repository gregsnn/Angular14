import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {ConsultaCepService} from "../service/consulta-cep.service";

@Directive({
  selector: '[validadorCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidandoCepDirective,
    multi: true
  }]
})
export class ValidandoCepDirective implements AsyncValidator {

  constructor(private cepService: ConsultaCepService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const CEP = control.value;

    return this.cepService.getConsultaCep(CEP).pipe(map((res: any) => {
      if (res.erro) return {'validadorCep': true};
      else return null;
    }));
  }

}
