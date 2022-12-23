import { ConditionTermComponent } from './../../modals/condition-term/condition-term.component';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.scss'],
})
export class CreateEmailComponent implements OnInit {
  public isSubmited = false;
  @ViewChild('checkbox') checkbox: any;
  @Output() public stepperEvent: EventEmitter<any> = new EventEmitter();
  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  public next() {
    if (this.checkbox.checked) {
      this.stepperEvent.emit('next');
    }
  }
  async openModalCondtion() {
    const modal = await this.modalController.create({
      component: ConditionTermComponent,
      componentProps: { value: 123 }
    });

    await modal.present();

  }

  public toggleCheck() {
    this.checkbox.checked = !this.checkbox.checked;
  }
}
