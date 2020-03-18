import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {HomeRouteModule} from './home-route.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRouteModule
  ],
  exports: [
    HomeRouteModule
  ]
})
export class HomeModule {
}
