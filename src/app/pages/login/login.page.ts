import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { AuthResult } from 'src/app/models/auth-result';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SessionService } from 'src/app/services/session.service';
import { ToastService } from './../../services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public isSubmited: boolean = false;
  public Pi = window['Pi'];
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    type: new FormControl('simple'),
  });
  reditectTo: string | null;
  constructor(
    private toastService: ToastService,
    private http: HttpService,
    private alertController: AlertController,
    private router: Router,
    private userService: UserService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private localstorageService: LocalstorageService,
    private paymentService: PaymentService,
  ) { }

  ngOnInit() {
    this.reditectTo = this.route.snapshot.queryParams.redirectTo || null;
  }

  public async login() {
    this.isSubmited = true;
    try {
      this.paymentService.auth().then((authResult: AuthResult) => {
        if (authResult.user) {
          this.userService.login({ ...this.loginForm.value, ...authResult }).subscribe((res: any) => {
            this.localstorageService.setItem('token', res.token);
            this.sessionService.getSessionStatus();
            this.isSubmited = false;
            this.toastService.show('success', 'Connexion réussie');
            this.router.navigate([this.reditectTo || '/']);
          }, (err: any) => {
            console.log(err);
            this.toastService.show('dark', 'Erreur de connexion');
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
  }

  public backHome(): void {
    this.router.navigate(['/']);
  }
}
