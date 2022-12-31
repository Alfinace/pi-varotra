import { Component, Input, OnInit } from '@angular/core';
import { New } from 'src/app/models/new.model';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
})
export class NewCardComponent implements OnInit {
  @Input() new: New;
  constructor() { }

  ngOnInit() { }

}
