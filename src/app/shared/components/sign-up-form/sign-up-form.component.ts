import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { checkPasswords } from 'src/app/utils/validators';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  public signUpForm: FormGroup;
  @Input() public viewStep = 2;
  @Output() public stepperEvent: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: [''],
      lastname: [''],
      password: [''],
    })
  }

  public onChangeStep(step: string) {
    if (step === 'next') {
      this.viewStep++;
    } else {
      this.viewStep--;
    }
    this.stepperEvent.emit(this.viewStep);
  }
}
