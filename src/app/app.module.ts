import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BasicAuthInterceptor } from './providers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { IonicGestureConfig } from './utils/gestures/ionic-gesture-config';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { RouteReuseStrategy } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(
    {
      mode: 'md',
    }
  ),
    AppRoutingModule,
    NgOtpInputModule,
    HttpClientModule,
    ChartModule,
    NgxIonicImageViewerModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
