import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loading = false;
  constructor(private loadingController: LoadingController) {}

  async presentLoading() {
    this.loading = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

  async dismissLoading() {
    this.loading = false;
    const loading = await this.loadingController.dismiss();
  }
}
