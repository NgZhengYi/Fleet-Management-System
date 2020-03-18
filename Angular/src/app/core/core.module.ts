import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppAntModule} from '../app.ant.module';
import {AppRouteModule} from '../app.route.module';
import {DrawerComponent} from './drawer/drawer.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    DrawerComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    AppAntModule,
    AppRouteModule,
    CommonModule,
  ],
  exports: [
    DrawerComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarComponent
  ]
})
export class CoreModule {
}
