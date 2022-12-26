import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
	let pass = group.get('password')?.value;
	let confirmPass = group.get('confirm')?.value
	return pass === confirmPass ? null : { notSame: true }
}