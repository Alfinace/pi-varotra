import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { New } from 'src/app/models/new.model';
import { NewDetailComponent } from '../../modals/new-detail/new-detail.component';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
})
export class NewCardComponent implements OnInit {
  @Input() _new: New;
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }


  async openNew() {
    const modal = await this.modalController.create({
      component: NewDetailComponent,
      componentProps: { _new: this._new }
    });

    await modal.present();

  }
}
