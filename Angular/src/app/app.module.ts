import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';

import {AppAntModule} from './app.ant.module';
import {AppComponent} from './app.component';
import {AppRouteModule} from './app.route.module';
import {AuthGuard} from './core/guard/auth.guard';
import {CoreModule} from './core/core.module';
import {LandingComponent} from './modules/landing/landing.component';
import {LoginModule} from './modules/login/login.module';
import {ManageAssetModule} from './modules/manage-asset/manage-asset.module';
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
    CoreModule,
    HttpClientModule,
    LoginModule,
    ManageAssetModule,
    NgZorroAntdModule,
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
