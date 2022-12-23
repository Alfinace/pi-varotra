import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  @Input() public viewStep = 0;
  @Output() public stepperEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  public onChangeStep(step: string) {
    if (step === 'next') {
      this.viewStep++;
    } else {
      this.viewStep--;
    }
    this.stepperEvent.emit(this.viewStep);
  }
}
