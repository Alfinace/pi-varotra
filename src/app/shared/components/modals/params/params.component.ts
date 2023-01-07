import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { SessionService } from 'src/app/services/session.service';
import { SocialNetworkComponent } from '../social-network/social-network.component';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss'],
})
export class ParamsComponent implements OnInit {
  public currentUser: any;
  constructor(
    private modalController: ModalController,
    private sessionService: SessionService
  ) {
    this.sessionService.getInfoUser().subscribe((user: any) => {
      if (user) {
        this.currentUser = user
      }
    })
  }

  ngOnInit() { }

  public close() {
    this.modalController.dismiss();
  }

  public async editProfile() {
    let modal = await this.modalController.create({
      component: EditProfileComponent,
      componentProps: { currentUser: this.currentUser }
    });
    return await modal.present();
  }

  public async editSocialNetwork() {

    let modal = await this.modalController.create({
      component: SocialNetworkComponent,
      componentProps: { currentUser: this.currentUser }
    });
    return await modal.present();
  }
}
