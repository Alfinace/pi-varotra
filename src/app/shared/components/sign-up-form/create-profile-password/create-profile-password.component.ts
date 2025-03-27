import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-create-profile-password',
  templateUrl: './create-profile-password.component.html',
  styleUrls: ['./create-profile-password.component.scss'],
})
export class CreateProfilePasswordComponent implements OnInit, OnDestroy {
  public isSubmited = false;
  @Input() signUpForm: FormGroup;
  constructor(
    private userService: UserService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    this.setClearValidors();
  }

  ngOnInit() {
    this.setValidators();
  }

  get password() {
    return this.signUpForm.get('password');
  }

  f() {
    return this.signUpForm.controls
  }

  get confirm() {
    return this.signUpForm.get('confirm');
  }

  setValidators() {
    this.signUpForm.controls['firstname'].setValidators(Validators.required);
    this.signUpForm.controls['password'].setValidators(Validators.required);
    this.signUpForm.addControl('confirm', new FormControl('', Validators.compose([Validators.required])));
  }

  setClearValidors() {
    this.signUpForm.controls['firstname'].clearValidators();
    this.signUpForm.controls['password'].clearValidators();
    this.signUpForm.removeControl('confirm');
  }


  save() {
    this.isSubmited = true;
    if (this.signUpForm.valid) {
      this.userService.save(this.signUpForm.value).subscribe((res) => {
        this.isSubmited = false;
        this.localstorageService.setItem('accessToken', res.token);
        this.router.navigate(['/'])
      }, err => {
        this.isSubmited = false;
      });
    }
  }

}
