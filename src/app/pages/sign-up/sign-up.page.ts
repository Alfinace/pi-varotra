import { checkPasswords } from './../../utils/validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public viewStep: number = 0;
  public signUpForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  public onChange(step: number) {
    this.viewStep = step
  }

  public back() {
    this.viewStep--;
  }
}
