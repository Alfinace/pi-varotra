import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { New } from 'src/app/models/new.model';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.scss'],
})
export class NewDetailComponent implements OnInit {
  @Input() _new: New;
  constructor(
    private m: ModalController
  ) { }

  ngOnInit() { }

  close() {
    this.m.dismiss();
  }
}
