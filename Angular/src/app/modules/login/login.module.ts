import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule} from 'ng-zorro-antd';

import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRouteModule} from './login-route.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRouteModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginRouteModule
  ]
})
export class LoginModule {
}
