import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public isSubmited: boolean = false;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  constructor() { }

  ngOnInit() {
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.isSubmited = true;
      setTimeout(() => {
        this.isSubmited = false;
        console.log(this.loginForm.value);
      }, 3000);
    }
  }

}
