import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManageVehicleComponent} from './manage-vehicle.component';
import {InsertVehicleComponent} from './insert-vehicle/insert-vehicle.component';
import {ViewVehicleComponent} from './view-vehicle/view-vehicle.component';
import {UpdateVehicleComponent} from './update-vehicle/update-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: ManageVehicleComponent
  },
  {
    path: 'insert-vehicle',
    component: InsertVehicleComponent
  },
  {
    path: 'view-vehicle',
    component: ViewVehicleComponent
  },
  {
    path: 'update-vehicle/:ID',
    component: UpdateVehicleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageVehicleRoutingModule {
}
