import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-profile-password',
  templateUrl: './create-profile-password.component.html',
  styleUrls: ['./create-profile-password.component.scss'],
})
export class CreateProfilePasswordComponent implements OnInit {
  public isSubmited = false;
  @Input() signUpForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.setValidators();
  }

  setValidators() {
    this.signUpForm.controls['firstname'].setValidators(Validators.required);
    this.signUpForm.controls['password'].setValidators(Validators.required);
    this.signUpForm.addControl('confirm', new FormControl('', Validators.compose([Validators.required])));
  }

}
