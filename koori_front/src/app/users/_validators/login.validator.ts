import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function loginValidator(): ValidatorFn {
	return (ctrl: AbstractControl): null | ValidationErrors => {
		if (ctrl.value.includes('@gmail.com')) {
			return null
		} else {
			return {
				loginValidator: 'login invalid'
			}
		}
	}
}


