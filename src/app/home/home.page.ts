import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private home: HomeService) {
    this.home.getLocations().subscribe((resp: any) => {
      console.log(resp);
    });
  }
}
