import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pub-card',
  templateUrl: './pub-card.component.html',
  styleUrls: ['./pub-card.component.scss'],
})
export class PubCardComponent implements OnInit {
  @Input() pub: any;
  constructor() { }

  ngOnInit() { }

}
