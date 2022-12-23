import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-condition-term',
  templateUrl: './condition-term.component.html',
  styleUrls: ['./condition-term.component.scss'],
})
export class ConditionTermComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  public close() {
    this.modalController.dismiss();
  }
}
