import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(public toastController: ToastController) {}

  // create and alert service
  async alertService(message: string) {
    const alert = await this.toastController.create({
      message: message,
      duration: 2000,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
