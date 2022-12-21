import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
})
export class GetStartedPage implements OnInit {
  public slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor() { }

  ngOnInit() {
  }

}
