import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
  public isSubmited = false;
  public resendCode = false;
  public config: any = {
    allowNumbersOnly: true,
    length: 4,
    containerClass: 'custom-ng-otp-input-wrapper',
    inputClass: 'custom-opt-input'
  }
  @Output() public stepperEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  public next() {
    this.stepperEvent.emit('next');
  }

  public onOtpChange(otp: string) {
    //  otp.length === 6;
  }
  public resend(e: any) {
    e.preventDefault();
    this.resendCode = true;
    setInterval(() => {
      this.resendCode = false;
    }, 3000);
  }
}
