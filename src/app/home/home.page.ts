import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../helpers/loading.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  locations: any = [];
  constructor(private home: HomeService, public loading: LoadingService) {
    this.getLocations();
  }

  getLocations() {
    this.loading.presentLoading();
    this.home.getLocations().subscribe((resp: any) => {
      this.locations = resp;
      this.loading.dismissLoading();
    });
  }
}
