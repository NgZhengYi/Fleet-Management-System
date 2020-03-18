import {NgModule} from '@angular/core';
import {NzDrawerModule, NzGridModule} from 'ng-zorro-antd';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzNoAnimationModule} from 'ng-zorro-antd/core';

@NgModule({
  imports: [
    NzDrawerModule,
    NzGridModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzNoAnimationModule,
  ],
  exports: [
    NzDrawerModule,
    NzGridModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzNoAnimationModule
  ]
})
export class AppAntModule {
}
