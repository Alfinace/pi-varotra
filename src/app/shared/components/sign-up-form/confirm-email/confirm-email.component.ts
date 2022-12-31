import { ToastService } from './../../../../services/toast.service';
import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  public isSubmited = false;
  @Input() signUpForm: FormGroup;
  public resendCode = false;
  public config: any = {
    allowNumbersOnly: true,
    length: 4,
    containerClass: 'custom-ng-otp-input-wrapper',
    inputClass: 'custom-opt-input'
  }
  public code: string;
  get email() {
    return this.signUpForm.get('email')
  }

  @Output() public stepperEvent: EventEmitter<any> = new EventEmitter();
  constructor(private userService: UserService,
    private toastService: ToastService) { }
  ngOnDestroy(): void {
    this.stepperEvent.unsubscribe();
  }

  ngOnInit() { }


  public next() {
    this.isSubmited = true;
    this.userService.confirmEmail(this.email?.value, this.code).subscribe((res: any) => {
      this.isSubmited = false;
      this.toastService.show('dark', 'Email confirmé avec succès');
      this.stepperEvent.emit('next');
    }, (err: any) => {
      this.isSubmited = false;
      this.toastService.show('danger', 'Code incorrect');
    })
  }

  public onOtpChange(otp: any) {
    this.code = otp.toString();
    console.log(this.code);
  }

  public resend(e: any) {
    e.preventDefault();
    this.resendCode = true;
    this.userService.resendCode(this.email?.value).subscribe((res: any) => {
      this.resendCode = false;
      this.toastService.show('dark', 'Code envoyé avec succès');
    }, (err: any) => {
      this.resendCode = false;
      this.toastService.show('danger', 'Il y a eu une erreur');
    })
  }
}
