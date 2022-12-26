import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

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
  constructor(
    private toastService: ToastService,
    private http: HttpService
  ) { }

  ngOnInit() {
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.isSubmited = true;
      this.http.post('auth/login', this.loginForm.value).subscribe((res: any) => {
        this.isSubmited = false;
        this.toastService.show('success', 'Connexion réussie');
      }, (err: any) => {
        console.log(err);
        this.toastService.show('dark', 'Email ou mot de passe incorrect');
        this.isSubmited = false;
      })
    }
  }


}
