import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import {AppAntModule} from '../../app.ant.module';
import {HomeComponent} from './home.component';
import {HomeRouteModule} from './home-route.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    AppAntModule,
    ChartsModule,
    CommonModule,
    HomeRouteModule,
    NzStatisticModule
  ],
  exports: [
    HomeRouteModule
  ]
})
export class HomeModule {
}
