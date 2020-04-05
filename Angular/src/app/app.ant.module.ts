import {NgModule} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzNoAnimationModule} from 'ng-zorro-antd/core';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTabsModule} from 'ng-zorro-antd/tabs';

@NgModule({
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzNoAnimationModule,
    NzSelectModule,
    NzSpinModule,
    NzStepsModule,
    NzTableModule,
    NzTabsModule
  ],
  exports: [
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzNoAnimationModule,
    NzSelectModule,
    NzSpinModule,
    NzStepsModule,
    NzTableModule,
    NzTabsModule
  ]
})
export class AppAntModule {
}
