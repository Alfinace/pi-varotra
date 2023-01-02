import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss'],
})
export class ParamsComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  public close() {
    this.modalController.dismiss();
  }

  public async editProfile() {
    let modal = await this.modalController.create({
      component: EditProfileComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
