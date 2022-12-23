import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public viewStep: number = 0;

  constructor() { }

  ngOnInit() {
  }

  public onChange(step: number) {
    this.viewStep = step
  }

  public back() {
    this.viewStep--;
  }
}
