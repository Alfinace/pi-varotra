import { UserService } from 'src/app/services/user.service';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { SessionService } from 'src/app/services/session.service';
import { SocialNetworkComponent } from '../social-network/social-network.component';
import { OverlayEventDetail } from '@ionic/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss'],
})
export class ParamsComponent implements OnInit {
  // @ViewChild('wallet') modalWaller: IonModal;
  @ViewChild('security') modalSecurity: IonModal;

  @Input() currentUser: any;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  // public publicKey: string;
  public updatePasswordForm: FormGroup;

  public isSubmited = false;
  constructor(
    private modalController: ModalController,
    private uploadService: UploadService,
    private sessionService: SessionService,
    private alertController: AlertController,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    // this.publicKey = this.currentUser.publicKey;
    this.updatePasswordForm = this.fb.group({
      password: ['', Validators.required],
      oldPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

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



  // cancel() {
  //   this.modalWaller.dismiss(null, 'cancel');
  // }

  cancel2() {
    this.modalSecurity.dismiss(null, 'cancel');
  }

  // save() {
  //   this.userService.updateUser({ publicKey: this.publicKey }).subscribe((res: any) => {
  //     this.sessionService.updateInfoUser({ ...this.currentUser, publicKey: this.publicKey });
  //     this.modalWaller.dismiss(this.publicKey, 'confirm');
  //   })
  // }

  save2() {
    if (this.updatePasswordForm.invalid) {
      return
    }
    this.userService.updatePassword(this.updatePasswordForm.value).subscribe((res: any) => {
      this.modalSecurity.dismiss(null, 'confirm');
      this.updatePasswordForm.reset();
    }
    )
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  get password() {
    return this.updatePasswordForm.get('password');
  }
  get confirmPassword() {
    return this.updatePasswordForm.get('confirmPassword');
  }

  public getImage(event: any) {
    this.currentUser.avatar = event.preview
    
    let formData = new FormData();
    formData.append('files', event.source);
    this.uploadService.upload(formData).then((res: any) => {
      this.userService.updateUser({ avatar: res.images[0] }).subscribe((res: any) => {
        this.sessionService.updateInfoUser({ ...this.currentUser, avatar: res.images[0] });
      }
      )
    })
  }

  async onLogout() {
    const alert = await this.alertController.create({
      header: 'Déconnexion!',
      message: 'Voulez-vous vous déconnecter ?',
      buttons: [
        {
          text: 'NON',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'OUI',
          handler: () => {
            this.sessionService.logout()
            this.router.navigate(['/client']);
            this.modalController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }
}
