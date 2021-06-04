import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesktopPageRoutingModule } from './desktop-routing.module';

import { DesktopPage } from './desktop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesktopPageRoutingModule
  ],
  declarations: [DesktopPage]
})
export class DesktopPageModule {}
