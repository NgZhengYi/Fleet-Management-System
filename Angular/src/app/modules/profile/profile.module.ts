import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileComponent} from './profile.component';
import {AppAntModule} from '../../app.ant.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    AppAntModule,
    CommonModule
  ]
})
export class ProfileModule {
}
