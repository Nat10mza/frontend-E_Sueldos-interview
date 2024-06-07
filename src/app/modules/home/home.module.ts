import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { NotAuthorizedPageComponent } from './not-authorized-page/not-authorized-page.component';

@NgModule({
  declarations: [HomePageComponent, NotAuthorizedPageComponent],
  imports: [CommonModule, HomeRoutingModule, MatButtonModule],
})
export class HomeModule {}
