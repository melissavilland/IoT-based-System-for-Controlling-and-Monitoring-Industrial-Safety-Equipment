import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LockControlComponent } from './lock-control/lock-control.component';
import { FormsModule } from '@angular/forms';
import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { LockMonitorComponent } from './lock-monitor/lock-monitor.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  // hostname: '192.168.1.184',
  // hostname: '192.168.1.31',
  hostname: '192.168.43.56',
  port: 9001,
  // protocol: (env.mqtt.protocol === "wss") ? "wss" : "ws",
  path: '',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LockControlComponent,
    LockMonitorComponent,
    AccountsComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
