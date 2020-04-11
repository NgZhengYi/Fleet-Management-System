import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

import {AppAntModule} from '../../app.ant.module';
import {ManageVehicleComponent} from './manage-vehicle.component';
import {ManageVehicleService} from './manage-vehicle.service';
import {ManageVehicleRoutingModule} from './manage-vehicle-routing.module';
import {InsertVehicleComponent} from './insert-vehicle/insert-vehicle.component';
import {UpdateVehicleComponent} from './update-vehicle/update-vehicle.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@NgModule({
  declarations: [
    ManageVehicleComponent,
    InsertVehicleComponent,
    UpdateVehicleComponent
  ],
  imports: [
    AppAntModule,
    ChartsModule,
    CommonModule,
    ManageVehicleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    ChartsModule,
    ManageVehicleRoutingModule,
  ],
  providers: [
    ManageVehicleService,
    {provide: ToastrService, useClass: ToastrService}
  ]
})
export class ManageVehicleModule {
}
