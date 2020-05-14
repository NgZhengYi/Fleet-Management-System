import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {en_US, NZ_I18N} from 'ng-zorro-antd';

import {AppAntModule} from './app.ant.module';
import {AppComponent} from './app.component';
import {AppRouteModule} from './app.route.module';
import {AuthGuard} from './core/guard/auth.guard';
import {CoreModule} from './core/core.module';
import {LandingComponent} from './modules/landing/landing.component';
import {LoginModule} from './modules/login/login.module';
import {NoGuard} from './core/guard/no.guard';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    AppAntModule,
    AppRouteModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    HttpClientModule,
    LoginModule,
  ],
  providers: [
    AuthGuard,
    NoGuard,
    {provide: NZ_I18N, useValue: en_US}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
