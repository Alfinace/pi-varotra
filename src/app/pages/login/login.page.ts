import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';
import { AuthResult } from 'src/app/models/auth-result';


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
    type: new FormControl('simple'),
  });
  constructor(
    private toastService: ToastService,
    private http: HttpService,
    private router: Router,
    private userService: UserService,
    private sessionService: SessionService,
    private localstorageService: LocalstorageService,
    private paymentService: PaymentService,
  ) { }

  ngOnInit() {
  }

  public async login() {
    if (this.loginForm.valid) {
      this.isSubmited = true;
      if (this.loginForm.value.type === 'simple') {
        try {
          this.paymentService.auth().then((authResult: AuthResult) => {
            if (authResult.user) {
              this.userService.login({ ...this.loginForm.value, ...authResult }).subscribe((res: any) => {
                this.localstorageService.setItem('token', res.token);
                this.sessionService.getSessionStatus();
                this.isSubmited = false;
                this.toastService.show('success', 'Connexion réussie');
                this.router.navigate(['/client']);
              }, (err: any) => {
                console.log(err);
                this.toastService.show('dark', 'Email ou mot de passe incorrect');
                this.isSubmited = false;
              })
            } else {
              this.toastService.show('dark', 'Erreur de connexion');
              this.isSubmited = false;
            }
          }).catch((err: any) => {
            alert(err)
            this.toastService.show('dark', 'Erreur de connexion');
            this.isSubmited = false;
          })

        } catch (error) {
          console.log('error', error);

        }
      } else {
        this.userService.login({ ...this.loginForm.value }).subscribe((res: any) => {
          this.localstorageService.setItem('token', res.token);
          this.sessionService.getSessionStatus();
          this.isSubmited = false;
          this.toastService.show('success', 'Connexion réussie');
          this.router.navigate(['/admin']);
        }
          , (err: any) => {
            console.log(err);
            this.toastService.show('dark', 'Email ou mot de passe incorrect');
            this.isSubmited = false;
          }
        )
      }
    }
  }

  public backHome(): void {
    this.router.navigate(['/client']);
  }
}
