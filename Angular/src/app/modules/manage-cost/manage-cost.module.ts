import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppAntModule} from '../../app.ant.module';
import {ManageCostComponent} from './manage-cost.component';
import {ManageCostRouteModule} from './manage-cost.route.module';

@NgModule({
  declarations: [
    ManageCostComponent
  ],
  imports: [
    AppAntModule,
    CommonModule,
    ManageCostRouteModule
  ],
  exports: [
    ManageCostRouteModule
  ]
})
export class ManageCostModule {
}
