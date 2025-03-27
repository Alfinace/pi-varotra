import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async show1() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async show(color: 'success' | 'danger' | 'warning' | 'info' | 'dark', message: string) {
    const toast = await this.toastController.create({
      animated: true,
      color,
      cssClass: 'toast-custom',
      duration: 5000,
      keyboardClose: true,
      message,
      position: 'bottom',
      translucent: true
    });
    toast.present();
  }
}
