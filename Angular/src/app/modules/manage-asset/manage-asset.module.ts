import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzButtonModule, NzModalModule, NzTableModule} from 'ng-zorro-antd';

import {AssetListComponent} from './asset-list/asset-list.component';
import {InsertFormComponent} from './insert-form/insert-form.component';
import {ManageAssetComponent} from './manage-asset.component';
import {ManageAssetRoutingModule} from './manage-asset-routing.module';
import {ManageAssetService} from './manage-asset.service';

@NgModule({
  declarations: [
    AssetListComponent,
    InsertFormComponent,
    ManageAssetComponent
  ],
  imports: [
    CommonModule,
    ManageAssetRoutingModule,
    NzModalModule,
    NzTableModule,
    NzButtonModule
  ],
  exports: [
    ManageAssetRoutingModule
  ],
  providers: [
    ManageAssetService
  ]
})
export class ManageAssetModule {
}
