import {NgModule} from '@angular/core';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDatePickerModule, NzTimePickerModule} from 'ng-zorro-antd';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzNoAnimationModule} from 'ng-zorro-antd/core';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTabsModule} from 'ng-zorro-antd/tabs';

@NgModule({
  imports: [
    NzAutocompleteModule,
    NzButtonModule,
    NzDatePickerModule,
    NzDrawerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzListModule,
    NzMenuModule,
    NzModalModule,
    NzNoAnimationModule,
    NzSelectModule,
    NzSpinModule,
    NzStepsModule,
    NzTableModule,
    NzTabsModule,
    NzTimePickerModule
  ],
  exports: [
    NzAutocompleteModule,
    NzButtonModule,
    NzDatePickerModule,
    NzDrawerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzListModule,
    NzMenuModule,
    NzModalModule,
    NzNoAnimationModule,
    NzSelectModule,
    NzSpinModule,
    NzStepsModule,
    NzTableModule,
    NzTabsModule,
    NzTimePickerModule
  ]
})
export class AppAntModule {
}
